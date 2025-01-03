import { left, right } from "@/shared/lib/either";
import cuid from "cuid";
import { DEFAULT_RATING } from "../domain";
import { userRepository } from "../user-repository";
import { passwordService } from "./password";
import { sessionService } from "./session";

interface LoginPasswordParams {
    login: string;
    password: string;
}

const createUser = async ({ login, password }: LoginPasswordParams) => {
    const userWithLogin = await userRepository.getUser({ login });

    if (userWithLogin) {
        return left("user-login-exists" as const);
    }

    const { hash, salt } = await passwordService.hashPassword(password);

    const user = await userRepository.saveUser({
        id: cuid(),
        login,
        passwordHash: hash,
        rating: DEFAULT_RATING,
        salt,
    });
    return right(user);
};

const verifyUserPassword = async ({ login, password }: LoginPasswordParams) => {
    const user = await userRepository.getUser({ login });
    if (!user) {
        return left("wrong-credentials" as const);
    }
    const isCompare = await passwordService.comparePassword({
        password,
        hash: user.passwordHash,
        salt: user.salt,
    });
    if (!isCompare) {
        return left("wrong-credentials" as const);
    }
    return right(user);
};

const getCurrentUser = async () => {
    const { session } = await sessionService.verifySession();
    return userRepository.getUser({ id: session.id });
};

export const userService = { createUser, verifyUserPassword, getCurrentUser };
