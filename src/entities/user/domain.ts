import { PlayerEntity } from "../game/domain";

export type UserEntity = {
    passwordHash: string;
    salt: string;
} & PlayerEntity;

export type SessionEntity = Omit<PlayerEntity, "rating"> & {
    expiredAt: string;
};

export const DEFAULT_RATING = 1000;
