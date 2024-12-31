import { Entity } from "../shared/domain";

export type GameEntity =
    | GameIdleEntity
    | GameInProgressEntity
    | GameOverEntity
    | GameOverDrawEntity;

type NotIdleGame = {
    players: PlayerEntity[];
    field: Field;
};

export type GameIdleEntity = {
    creator: PlayerEntity;
    status: "idle";
} & Entity;

export type GameInProgressEntity = {
    status: "inProgress";
} & Entity &
    NotIdleGame;

export type GameOverEntity = {
    status: "gameOver";
    winner: PlayerEntity;
} & Entity &
    NotIdleGame;

export type GameOverDrawEntity = {
    status: "gameOverDraw";
} & Entity &
    NotIdleGame;

export type PlayerEntity = {
    login: string;
    rating: number;
} & Entity;

export type Field = Cell[];

export type Cell = GameSymbol | null;
export type GameSymbol = string;
