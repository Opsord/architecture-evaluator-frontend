import type { ReactNode } from "react";

interface CardWithLinkProps {
    title: string;
    description: string;
    link: string;
    linkText: string;
    className?: string;
    children?: ReactNode;
}

export function CardWithLink({
                                 title,
                                 description,
                                 link,
                                 linkText,
                                 className,
                                 children,
                             }: CardWithLinkProps) {
    return (
        <div className={`max-w-sm p-6 bg-background-light border border-gray-border rounded-lg shadow-sm dark:bg-background-dark dark:border-gray-dark ${className ?? ""}`}>
            <a href={link}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-dark dark:text-white">{title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-medium dark:text-gray-light">{description}</p>
            {children}
            <a
                href={link}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary/30 dark:bg-primary dark:hover:bg-primary-dark dark:focus:ring-primary-dark/80 rounded-lg"
            >
                {linkText}
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
    );
}

