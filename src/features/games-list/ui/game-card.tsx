import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { FC } from "react";

interface Props {
    login: string;
    rating: number;
    className?: string;
}

export const GameCard: FC<Props> = ({ login, rating, className }) => {
    return (
        <div className={className}>
            <Card>
                <CardHeader>
                    <CardTitle>Игра с {login}</CardTitle>
                </CardHeader>
                <CardContent>Рейтинг: {rating}</CardContent>
            </Card>
        </div>
    );
};
