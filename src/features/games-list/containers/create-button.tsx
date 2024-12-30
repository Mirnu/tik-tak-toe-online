"use client";

import { Button } from "@/shared/ui/button";
import { FC, startTransition } from "react";
import { createGameAction } from "../actions/create-game";
import { Either, mapLeft, right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";
import { cn } from "@/shared/lib/css";

interface Props {
    className?: string;
    action: () => Promise<Either<unknown, unknown>>;
}

export const CreateButton: FC<Props> = ({ className }) => {
    const [data, dispatch, isPending] = useActionState(
        createGameAction,
        right(undefined)
    );

    return (
        <div className={cn(className, "flex flex-col gap-1")}>
            <Button
                disabled={isPending}
                onClick={() => startTransition(dispatch)}
                error={mapLeft(
                    data,
                    (e) =>
                        ({
                            ["can-create-only-one-game"]: "Вы уже создали игру",
                            ["user-not-found"]: "Нет пользователя",
                        }[e] ?? "Неизвестная ошибка")
                )}
            >
                Создать игру
            </Button>
        </div>
    );
};
