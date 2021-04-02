import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import useGameRoomList from "./useGameRoomList";

const { REACT_APP_SERVER_BASE_URL } = process.env;

const server = setupServer(
  rest.get(
    (REACT_APP_SERVER_BASE_URL as string) + "/gamerooms",
    (req, res, ctx) => {
      console.log("Mock");
      return res(
        ctx.json([
          { id: 1, title: "Nr 1" },
          { id: 2, title: "Nr 2" },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useGameRoomList", () => {
  test("return the correct list of game rooms", async () => {
    const { result, waitForValueToChange, rerender } = renderHook(() =>
      useGameRoomList()
    );

    await waitForValueToChange(() => {
      return result.current;
    });

    expect(result.current.length).toBe(2);
    expect(result.current[0]).toContainEqual({ id: 1, title: "Nr 1" });
    expect(result.current[0]).toContainEqual({ id: 2, title: "Nr 2" });
  });
});
