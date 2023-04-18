import { Direction as DirectionRecord, GameState } from "./constants";

export type Position = {
  x: number;
  y: number;
};

export type DirectionT = keyof typeof DirectionRecord;
export type GameStateT = keyof typeof GameState;
