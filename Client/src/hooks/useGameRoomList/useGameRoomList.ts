import {
  GameRoomType,
  getGameRoomList,
} from "./../../services/gameRoomService";
import { useEffect, useState } from "react";

export default function useGameRoomList(): [GameRoomType[], boolean] {
  const [gameRoomList, setGameRoomList] = useState<GameRoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getGameRoomList().then((data) => {
      console.log(data);
      setGameRoomList(data);
      setIsLoading(false);
    });
  }, []);
  return [gameRoomList, isLoading];
}
