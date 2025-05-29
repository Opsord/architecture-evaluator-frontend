import type {ReactNode} from "react";

export function Card({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-6 rounded-xl">
            {children}
        </div>
    );
}
