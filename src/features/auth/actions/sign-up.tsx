import { userService } from "@/entities/user/server";
import { left, mapLeft } from "@/shared/lib/either";
import { error } from "console";
import { z } from "zod";

const formDataSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(3),
});

export type SignUpFormState = {
    formData?: FormData;
    errors?: {
        login?: string;
        password?: string;
        _errors?: string;
    };
};

export const signUpAction = async (
    state: SignUpFormState,
    formData: FormData
) => {
    const data = Object.fromEntries(formData.entries());

    const result = formDataSchema.safeParse(data);

    if (!result.success) {
        return left(result.error.message);
    }

    const createUserResult = await userService.createUser(result.data);

    return mapLeft(createUserResult, (error) => {
        return {
            "user-login-exists": "Пользователь с таким логином уже существует",
        }[error];
    });
};
