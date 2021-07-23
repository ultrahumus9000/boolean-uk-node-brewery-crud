const express = require("express");
const morgan = require("morgan");
const breweryRouter = require("./src/router");
const bookingRouter = require("./src/booking");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/breweries", breweryRouter);
app.use("/tour", bookingRouter);

app.listen(4000, () => {
  console.log("me here");
});
