import { Direction } from "../constants";
import { DirectionT } from "../types";

const Opposites = {
  [Direction.DOWN]: Direction.UP,
  [Direction.UP]: Direction.DOWN,
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT,
};

export const checkOppositeDirection = (
  newDirection: DirectionT,
  direction?: DirectionT
) => {
  if (!direction) {
    return newDirection;
  }

  if (Opposites[direction] === newDirection) {
    return direction;
  }

  return newDirection;
};
