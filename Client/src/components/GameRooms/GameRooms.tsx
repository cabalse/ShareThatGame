import {
  GameRoomType,
  getGameRoomList,
} from "./../../services/gameRoomService";
import { useEffect, useState } from "react";

type GameRoomsProps = {
  onChange: (id: string) => void;
};

export default function GameRooms(props: GameRoomsProps) {
  const [gameRooms, setGameRooms] = useState<GameRoomType[]>([]);
  useEffect(() => {
    getGameRoomList().then((res) => setGameRooms(res));
  }, []);
  return (
    <div>
      <select onChange={(e) => props.onChange(e.target.value)}>
        <option value="0">Select Room</option>
        {gameRooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.title}
          </option>
        ))}
      </select>
    </div>
  );
}
