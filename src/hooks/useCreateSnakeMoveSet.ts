import { useCallback } from "react";
import { Position } from "../types";

type SnakeBody = Position[];

export const useCreateSnakeMoveSet = (gridSize: number = 5) => {
  return useCallback(
    () => ({
      right: (body: SnakeBody) => {
        const currentBody = [...body];
        const headPosition = currentBody[currentBody.length - 1];

        currentBody.shift();

        return [
          ...currentBody,
          { ...headPosition, x: headPosition.x + gridSize },
        ];
      },
      left: (body: SnakeBody) => {
        const currentBody = [...body];
        const headPosition = currentBody[currentBody.length - 1];

        currentBody.shift();

        return [
          ...currentBody,
          { ...headPosition, x: headPosition.x - gridSize },
        ];
      },
      up: (body: SnakeBody) => {
        const currentBody = [...body];
        const headPosition = currentBody[currentBody.length - 1];

        currentBody.shift();

        return [
          ...currentBody,
          { ...headPosition, y: headPosition.y - gridSize },
        ];
      },
      down: (body: SnakeBody) => {
        const currentBody = [...body];
        const headPosition = currentBody[currentBody.length - 1];

        currentBody.shift();

        return [
          ...currentBody,
          { ...headPosition, y: headPosition.y + gridSize },
        ];
      },
    }),
    [gridSize]
  );
};
