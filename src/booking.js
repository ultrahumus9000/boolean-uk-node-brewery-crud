const express = require("express");
const bookingRouter = express.Router();

let bookingGB = [
  {
    id: 1,
    breweryId: 9180,
    numberPeople: 2,
    date: "23/12/2021",
  },
  {
    id: 2,
    breweryId: 10486,
    numberPeople: 2,
    date: "23/12/2021",
  },
];
bookingRouter.get("/", (req, res) => {
  const dateInfo = req.query.date;
  if (dateInfo) {
    let filteredBookings = bookingGB.filter((booking) =>
      booking.date.includes(dateInfo)
    );
    res.json(filteredBookings);
    return;
  } else {
    res.json(bookingGB);
  }
});

bookingRouter.patch("/:id", (req, res) => {
  const bookingId = Number(req.params.id);
  let findObj = bookingGB.findIndex((booking) => booking.id === bookingId);
  if (findObj < 0) {
    res.status(400).json("bad request");
  } else {
    // bookingGB = bookingGB.map((booking) => {
    //   return booking.id === bookingId ? { ...booking, ...req.body } : booking;
    // });
    bookingGB[findObj] = { ...bookingGB[findObj], ...req.body };
    res.json({ ...findObj, ...req.body });
  }
});
module.exports = bookingRouter;
