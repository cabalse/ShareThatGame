const { REACT_APP_SERVER_BASE_URL } = process.env;

export type GameRoomType = {
  id: number;
  title: string;
};

export const getGameRoomList = (): Promise<GameRoomType[]> =>
  fetch((REACT_APP_SERVER_BASE_URL as string) + "/gamerooms").then((response) =>
    response.json()
  );
