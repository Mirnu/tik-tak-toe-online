import { SessionEntity, UserEntity } from "./domain";

export const userToSession = (
    user: UserEntity,
    expiredAt: string
): SessionEntity => {
    return {
        id: user.id,
        login: user.login,
        expiredAt,
    };
};
