import type {ReactNode} from "react";

export function HomeLayout({ left, right }: { left: ReactNode; right: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {left}
                {right}
            </div>
        </div>
    );
}
