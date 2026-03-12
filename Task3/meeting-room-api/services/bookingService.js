const pool = require("../db/db");

exports.createBooking = async (data, idempotencyKey) => {
  const { roomId, title, organizerEmail, startTime, endTime } = data;

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) throw new Error("startTime must be before endTime");

  const duration = (end - start) / (1000 * 60);

  if (duration < 15 || duration > 240)
    throw new Error("Booking must be 15 minutes to 4 hours");

  if (idempotencyKey) {
    const keyCheck = await pool.query(
      "SELECT response FROM idempotency_keys WHERE key=$1",
      [idempotencyKey],
    );

    if (keyCheck.rows.length) return keyCheck.rows[0].response;
  }

  const room = await pool.query("SELECT * FROM rooms WHERE id=$1", [roomId]);

  if (!room.rows.length) throw new Error("ROOM_NOT_FOUND");

  const overlap = await pool.query(
    `SELECT * FROM bookings
     WHERE room_id=$1
     AND status='confirmed'
     AND start_time < $2
     AND end_time > $3`,
    [roomId, endTime, startTime],
  );

  if (overlap.rows.length) throw new Error("OVERLAP");

  const result = await pool.query(
    `INSERT INTO bookings(room_id,title,organizer_email,start_time,end_time,status)
     VALUES($1,$2,$3,$4,$5,'confirmed')
     RETURNING *`,
    [roomId, title, organizerEmail, startTime, endTime],
  );

  const booking = result.rows[0];

  if (idempotencyKey) {
    await pool.query(
      `INSERT INTO idempotency_keys(key,organizer,response)
       VALUES($1,$2,$3)`,
      [idempotencyKey, organizerEmail, booking],
    );
  }

  return booking;
};

exports.getBookings = async (query) => {
  let sql = "SELECT * FROM bookings WHERE 1=1";
  let values = [];

  if (query.roomId) {
    values.push(query.roomId);
    sql += ` AND room_id=$${values.length}`;
  }

  const result = await pool.query(sql, values);

  return result.rows;
};

exports.cancelBooking = async (id) => {
  const booking = await pool.query("SELECT * FROM bookings WHERE id=$1", [id]);

  if (!booking.rows.length) throw new Error("Booking not found");

  const start = new Date(booking.rows[0].start_time);
  const now = new Date();

  const diff = (start - now) / (1000 * 60);

  if (diff < 60) throw new Error("Cannot cancel within 1 hour");

  const result = await pool.query(
    `UPDATE bookings
     SET status='cancelled'
     WHERE id=$1
     RETURNING *`,
    [id],
  );

  return result.rows[0];
};
