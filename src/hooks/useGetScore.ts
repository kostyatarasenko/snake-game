import { useCallback } from "react";

type UseGetScoreFNArgs = {
  ctx: CanvasRenderingContext2D;
  score: number;
  xPos: number;
  isGameOver: boolean;
};

export const useGetScore = () =>
  useCallback(({ ctx, score, xPos, isGameOver }: UseGetScoreFNArgs) => {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "8px serif";
    const text = isGameOver ? "Game over" : `Your score: ${score}`;

    const { width } = ctx.measureText(text);

    ctx.fillText(text, xPos - width / 2, 10);
  }, []);
