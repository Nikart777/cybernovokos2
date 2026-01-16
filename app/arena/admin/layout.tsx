import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Arena Admin | CyberX Novokosino",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ArenaAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
