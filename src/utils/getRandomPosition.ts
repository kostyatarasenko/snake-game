import { SEG_SIZE } from "../constants";

type GetRandomPositionArgs = {
  gridSize?: number;
  threshold: number;
};

export const getRandomPosition = ({
  gridSize = SEG_SIZE,
  threshold,
}: GetRandomPositionArgs) => {
  return Math.floor(Math.random() * (threshold / gridSize)) * gridSize;
};
