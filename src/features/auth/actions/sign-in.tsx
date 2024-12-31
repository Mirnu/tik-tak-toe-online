"use server";

import { sessionService, userService } from "@/entities/user/server";
import { Either, left, mapLeft } from "@/shared/lib/either";
import { redirect } from "next/navigation";
import { z } from "zod";

const formDataSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(3),
});

export const signInAction = async (
    state: unknown,
    formData: FormData
): Promise<Either<string, unknown>> => {
    const data = Object.fromEntries(formData.entries());
    const result = formDataSchema.safeParse(data);

    if (!result.success) {
        return left(`Ошибка валидации формы: ${result.error.message}`);
    }

    const verifyUserResult = await userService.verifyUserPassword(result.data);

    if (verifyUserResult.type === "right") {
        await sessionService.addSession(verifyUserResult.value);

        redirect("/");
    }

    return mapLeft(verifyUserResult, (error) => {
        return {
            "wrong-credentials": "Неправильный логин или пароль",
        }[error];
    });
};
