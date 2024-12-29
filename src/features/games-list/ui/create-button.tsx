import { Button } from "@/shared/ui/button";
import { FC } from "react";

interface Props {
    className?: string;
    action: () => Promise<void>;
}

export const CreateButton: FC<Props> = ({ className }) => {
    return <Button className={className}>Создать игру</Button>;
};
