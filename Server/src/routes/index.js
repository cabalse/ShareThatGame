const express = require("express");
const GameRooms = require("./../modules/gameRooms");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/gamerooms", (req, res) => {
  let rooms = [];
  GameRooms.getGameRooms().map((room) => {
    rooms.push({ id: room.id, title: room.title });
  });
  res.setHeader("Content-Type", "application/json");
  res.json(rooms).status(200);
});

router.get("/gameroom/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res
    .json({
      ...GameRooms.getGameRoomByID(req.params.id),
      password: "",
      adminPassword: "",
    })
    .status(200);
});

module.exports = router;
