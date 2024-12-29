import { FC, PropsWithChildren } from "react";

interface Props {
    actions: React.ReactNode;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ children, actions }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row justify-end gap-4">{actions}</div>
            {children}
        </div>
    );
};
