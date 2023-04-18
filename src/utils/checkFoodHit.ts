import { Direction, SEG_SIZE } from "../constants";
import { DirectionT, Position } from "../types";

type CheckFoodHitArgs = {
  foodPos?: Position;
  snakeHeadPos: Position;
  direction?: DirectionT;
};

export const checkFoodHit = ({
  foodPos,
  snakeHeadPos,
  direction,
}: CheckFoodHitArgs) => {
  if (!direction || !foodPos) {
    return false;
  }

  switch (direction) {
    case Direction.UP:
      return (
        foodPos.x === snakeHeadPos.x && snakeHeadPos.y - SEG_SIZE === foodPos.y
      );
    case Direction.DOWN:
      return (
        foodPos.x === snakeHeadPos.x && snakeHeadPos.y + SEG_SIZE === foodPos.y
      );
    case Direction.LEFT:
      return (
        foodPos.y === snakeHeadPos.y && snakeHeadPos.x - SEG_SIZE === foodPos.x
      );
    case Direction.RIGHT:
      return (
        foodPos.y === snakeHeadPos.y && snakeHeadPos.x + SEG_SIZE === foodPos.x
      );
  }
};
