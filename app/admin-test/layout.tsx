import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Тест администратора",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminTestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
