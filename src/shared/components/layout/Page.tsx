import Head from "next/head";
import { Ubuntu } from "next/font/google";
import { ReactNode } from "react";

interface PageProps {
    title: string;
    children: ReactNode;
}
const ubuntu = Ubuntu({
    weight: "400",
    subsets: ["latin"],
});

/// Place your layout definitions here
const Page: React.FC<PageProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={ubuntu.className}>{children}</div>
        </>
    );
};
export default Page;
