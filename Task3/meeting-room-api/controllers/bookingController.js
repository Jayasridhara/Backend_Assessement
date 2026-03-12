const bookingService = require("../services/bookingService");

exports.createBooking = async (req, res) => {
  try {
    const idempotencyKey = req.headers["idempotency-key"];

    const booking = await bookingService.createBooking(
      req.body,
      idempotencyKey,
    );

    res.json(booking);
  } catch (err) {
    if (err.message === "ROOM_NOT_FOUND")
      return res.status(404).json({ error: "Room not found" });

    if (err.message === "OVERLAP")
      return res.status(409).json({ error: "Booking overlap" });

    res.status(400).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getBookings(req.query);

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const result = await bookingService.cancelBooking(req.params.id);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
