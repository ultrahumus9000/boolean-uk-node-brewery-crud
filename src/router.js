const express = require("express");
const bookingRouter = require("./booking");
const breweryRouter = express.Router();
const breweriesDB = require("./data");

breweryRouter.get("/", (req, res) => {
  let queryData = req.query.brewery_type;
  if (queryData) {
    let filteredData = breweriesDB.filter(
      (brewery) => brewery.brewery_type === queryData
    );
    res.json(filteredData);
  } else {
    res.json(breweriesDB);
  }
});

breweryRouter.get("/:id", (req, res) => {
  const breweryId = Number(req.params.id);
  let filteredBrewwery = breweriesDB.filter(
    (brewery) => brewery.id === breweryId
  );
  if (filteredBrewwery.length === 0) {
    res.status(400).json("wrong query");
    return;
  }
  res.json(filteredBrewwery);
});

breweryRouter.post("/", (req, res) => {
  let newBrewery = req.body;
  breweriesDB.push(newBrewery);
  res.json(newBrewery);
});

breweryRouter.delete("/:id", (req, res) => {
  const breweryId = Number(req.params.id);
  let filteredBrewweryIndex = breweriesDB.findIndex(
    (brewery) => brewery.id === breweryId
  );
  if (filteredBrewweryIndex === -1) {
    res.status(400).json("wrong query so data cannot be deleted");
    return;
  } else {
    breweriesDB.splice(filteredBrewweryIndex, 1);
    res.json("successfully deleted");
    return;
  }
});

bookingRouter.put("/:id", (req, res) => {
  const breweryId = Number(req.params.id);
  let filteredBrewweryIndex = breweriesDB.findIndex(
    (brewery) => brewery.id === breweryId
  );
  let newChangeInfo = req.body;
  if (filteredBrewweryIndex >= 0) {
    breweriesDB[filteredBrewweryIndex] = newChangeInfo;
    res.json(newChangeInfo);
    //imutateable breweriesDB = breweriesDB.map(brewery=>{ if(brewery.id===breweryId){return newChangeInfo }else{return brewery} })
  } else {
    res.json("wrong request");
  }
});

module.exports = breweryRouter;
