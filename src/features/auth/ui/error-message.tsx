import { Either } from "@/shared/lib/either";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import React from "react";

export function ErrorMessage({
    error,
}: {
    error: Either<string, unknown> | undefined;
}) {
    if (error?.type === "left") {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error.error}</AlertDescription>
            </Alert>
        );
    }
    return null;
}
