const gameRooms = [
  {
    id: 1,
    title: "Hell on Wheels",
    adminPassword: "admin",
    password: "1",
    active: false,
    activeTime: 0,
    admin: "",
    users: [],
    init: [],
  },
  {
    id: 2,
    title: "Stygian Corner",
    adminPassword: "admin",
    password: "2",
    active: false,
    activeTime: 0,
    admin: "",
    users: [],
    init: [],
  },
  {
    id: 3,
    title: "Smak Bros",
    adminPassword: "admin",
    password: "3",
    active: false,
    activeTime: 0,
    admin: "",
    users: [],
    init: [],
  },
];

const getGameRooms = () => gameRooms;

const getGameRoomByID = (id) => {
  let room = gameRooms.filter((room) => room.id == id);
  return room[0];
};

const getGameRoomByName = (name) => {
  let room = gameRooms.filter((room) => room.name == name);
  return room[0];
};

const authorizeForGameRoom = (id, password) => {
  let room = getGameRoomByID(id);
  return password === room.password;
};

const adminAuthorizeForGameRoom = (id, password) => {
  let room = getGameRoomByID(id);
  return password === room.adminPassword;
};

module.exports = {
  getGameRooms,
  getGameRoomByID,
  getGameRoomByName,
  authorizeForGameRoom,
  adminAuthorizeForGameRoom,
};
