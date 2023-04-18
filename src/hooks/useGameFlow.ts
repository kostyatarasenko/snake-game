import { useEffect, useState } from "react";

import { useCreateSnakeMoveSet, useInterval } from "./";
import {
  checkFoodHit,
  checkOppositeDirection,
  checkSelfHit,
  getRandomPosition,
} from "../utils";
import { Direction, GameState, SEG_SIZE } from "../constants";

import { DirectionT, GameStateT, Position } from "../types";

const SPEED_INTERVAL = 80;

type UseGameFlowArgs = {
  canvasWidth: number;
  canvasHeight: number;
  onGameOver: () => void;
  gameState: GameStateT;
};

export const useGameFlow = ({
  canvasHeight,
  canvasWidth,
  onGameOver,
  gameState,
}: UseGameFlowArgs) => {
  const [direction, setDirection] = useState<DirectionT>();
  const [snakeBody, setSnakeBody] = useState<Position[]>([{ x: 0, y: 0 }]);

  const [foodPos, setFoodPos] = useState<Position | undefined>();

  const snakeHeadPos = snakeBody[snakeBody.length - 1];

  const boardWidth = canvasWidth * 2;
  const boardHeight = canvasHeight / 2;

  const createMoveSet = useCreateSnakeMoveSet(SEG_SIZE);
  const moves = createMoveSet();

  const getRandomState = () => {
    setFoodPos({
      x: getRandomPosition({ threshold: boardWidth }),
      y: getRandomPosition({ threshold: boardHeight }),
    });

    setSnakeBody([
      {
        x: getRandomPosition({ threshold: boardWidth }),
        y: getRandomPosition({ threshold: boardHeight }),
      },
    ]);
  };

  const resetGame = () => {
    setDirection(undefined);

    getRandomState();
  };

  useEffect(getRandomState, [canvasHeight, canvasWidth]);

  const moveSnake = () => {
    let newBody: Position[] | undefined;

    switch (direction) {
      case Direction.UP:
        if (snakeHeadPos.y < SEG_SIZE) {
          onGameOver();
        }

        newBody = moves.up(snakeBody);
        break;
      case Direction.DOWN:
        if (snakeHeadPos.y > boardHeight - SEG_SIZE * 2) {
          onGameOver();
        }

        newBody = moves.down(snakeBody);
        break;
      case Direction.RIGHT:
        if (snakeHeadPos.x > boardWidth - SEG_SIZE * 2) {
          onGameOver();
        }
        newBody = moves.right(snakeBody);
        break;
      case Direction.LEFT:
        if (snakeHeadPos.x < SEG_SIZE) {
          onGameOver();
        }

        newBody = moves.left(snakeBody);
        break;
    }

    const gotHit = checkFoodHit({ foodPos, direction, snakeHeadPos });

    if (gotHit && foodPos) {
      setSnakeBody([...snakeBody, { x: foodPos.x, y: foodPos.y }]);

      setFoodPos({
        x: getRandomPosition({ threshold: boardWidth }),
        y: getRandomPosition({ threshold: boardHeight }),
      });
    } else if (newBody) {
      const isGameOver = checkSelfHit(newBody);
      if (isGameOver) {
        onGameOver();
      }

      setSnakeBody(newBody);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "KeyS":
        setDirection(checkOppositeDirection(Direction.DOWN, direction));
        break;
      case "KeyW":
        setDirection(checkOppositeDirection(Direction.UP, direction));
        break;
      case "KeyD":
        setDirection(checkOppositeDirection(Direction.RIGHT, direction));
        break;
      case "KeyA":
        setDirection(checkOppositeDirection(Direction.LEFT, direction));
        break;
    }
  };

  const gameSpeed = gameState === GameState.Playing ? SPEED_INTERVAL : null;
  useInterval(moveSnake, gameSpeed);

  return {
    snakeBody,
    handleKeyDown,
    foodPos,
    resetGame,
  };
};
