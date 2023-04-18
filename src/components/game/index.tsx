import { useRef, useState } from "react";

import Canvas from "../canvas";

import {
  useGameFlow,
  useGetDrawSnakeBody,
  useGetFood,
  useGetScore,
} from "../../hooks";
import { GameStateT } from "../../types";
import { GameState } from "../../constants";

import "./game.css";

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawSnake = useGetDrawSnakeBody();
  const getFood = useGetFood();
  const getScore = useGetScore();

  const [gameState, setGameState] = useState<GameStateT>(GameState.Playing);

  const handleGameOver = () => setGameState(GameState.Over);
  const handlePause = () =>
    setGameState(
      gameState === GameState.Playing ? GameState.Paused : GameState.Playing
    );
  const handlePlayAgain = () => {
    setGameState(GameState.Playing);

    resetGame();
  };

  const { snakeBody, handleKeyDown, foodPos, resetGame } = useGameFlow({
    canvasHeight: canvasRef.current?.width || 0,
    canvasWidth: canvasRef.current?.height || 0,
    gameState,
    onGameOver: handleGameOver,
  });

  const draw = (ctx: CanvasRenderingContext2D) => {
    getFood({ ctx, foodPos });
    getScore({
      ctx,
      score: (snakeBody.length - 1) * 10,
      xPos: (canvasRef.current?.width || 0) / 2,
      isGameOver: gameState === GameState.Over,
    });

    drawSnake({ ctx, snakeBody });
  };

  return (
    <div className="wrapper" tabIndex={0} onKeyDown={handleKeyDown}>
      <Canvas ref={canvasRef} draw={draw} />
      {gameState === GameState.Over ? (
        <button onClick={handlePlayAgain}>Play again</button>
      ) : (
        <button onClick={handlePause}>
          {gameState === GameState.Playing ? "Pause" : "Play"}
        </button>
      )}
    </div>
  );
};

export default Game;
