import { GameRoomType } from "../../services/gameRoomService";

type GameRoomsProps = {
  gameRoomList: GameRoomType[];
  onChange: (id: string) => void;
};

export default function GameRooms(props: GameRoomsProps) {
  return (
    <div>
      <select onChange={(e) => props.onChange(e.target.value)}>
        <option value="0">Select Room</option>
        {props.gameRoomList.map((room) => (
          <option key={room.id} value={room.id}>
            {room.title}
          </option>
        ))}
      </select>
    </div>
  );
}
