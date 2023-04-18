import { Position } from "../types";

export const checkSelfHit = (snakeBody: Position[]) => {
  if (snakeBody.length <= 1) {
    return false;
  }

  const lastIndex = snakeBody.length - 1;

  const head = snakeBody[lastIndex];
  const body = snakeBody.slice(0, lastIndex);

  return body.some((seg) => seg.x === head.x && seg.y === head.y);
};
