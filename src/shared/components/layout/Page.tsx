import Head from "next/head";
import { Ubuntu } from "next/font/google";
import React from "react";

interface PageProps {
    title: string;
    children: React.ReactNode;
}
const ubuntu = Ubuntu({
    weight: "400",
    subsets: ["latin"],
});

/// Place your layout definitions here
const Page: React.FC<PageProps> = ({ children, title }) => {
    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </React.Fragment>
    );
};
export default Page;
