import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            {children}
        </div>
    );
}
