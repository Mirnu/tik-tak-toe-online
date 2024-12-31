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

    const createUserResult = await userService. (result.data);

    if (createUserResult.type === "right") {
        await sessionService.addSession(createUserResult.value);

        redirect("/");
    }

    return mapLeft(createUserResult, (error) => {
        return {
            "user-login-exists": "Пользователь с таким логином уже существует",
        }[error];
    });
};
