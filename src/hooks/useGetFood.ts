import { useCallback } from "react";
import { SEG_SIZE } from "../constants";
import { Position } from "../types";

type UseGetFoodFNArgs = {
  ctx: CanvasRenderingContext2D;
  foodPos?: Position;
};

export const useGetFood = () =>
  useCallback(({ ctx, foodPos }: UseGetFoodFNArgs) => {
    if (foodPos) {
      ctx.fillStyle = "rgb(255, 0, 0)";
      ctx.fillRect(foodPos?.x, foodPos?.y, SEG_SIZE, SEG_SIZE);
    }
  }, []);
