import { useCallback } from "react";

import { Position } from "../types";
import { SEG_SIZE } from "../constants";

type DrawFNArgs = {
  ctx: CanvasRenderingContext2D;
  snakeBody: Position[];
};

export const useGetDrawSnakeBody = () =>
  useCallback(({ ctx, snakeBody }: DrawFNArgs) => {
    ctx.fillStyle = "rgb(0, 255, 0)";

    snakeBody.forEach((segment) =>
      ctx.fillRect(segment.x, segment.y, SEG_SIZE, SEG_SIZE)
    );
  }, []);
