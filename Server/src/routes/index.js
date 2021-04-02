const express = require("express");
const getGameRooms = require("./../modules/gameRooms");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/gamerooms", (req, res) => {
  let rooms = [];
  getGameRooms().map((room) => {
    rooms.push({ id: room.id, title: room.title });
  });
  res.setHeader("Content-Type", "application/json");
  res.json(rooms).status(200);
});

module.exports = router;
