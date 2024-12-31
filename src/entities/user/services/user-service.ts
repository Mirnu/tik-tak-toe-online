import { left, right } from "@/shared/lib/either";
import cuid from "cuid";
import { DEFAULT_RATING } from "../domain";
import { userRepository } from "../user-repository";
import { passwordService } from "./password-service";

const createUser = async ({
    login,
    password,
}: {
    login: string;
    password: string;
}) => {
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
        salt: salt,
    });
    return right(user);
};

export const userService = { createUser };
