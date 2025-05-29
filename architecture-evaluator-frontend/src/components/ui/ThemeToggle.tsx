// src/components/ui/ThemeToggle.tsx
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="text-sm px-4 py-2 rounded-md border bg-gray-100 dark:bg-gray-700 dark:text-white"
        >
            {isDark ? "☀️ Modo claro" : "🌙 Modo oscuro"}
        </button>
    );
}
