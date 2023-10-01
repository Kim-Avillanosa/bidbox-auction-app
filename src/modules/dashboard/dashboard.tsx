import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout, Page, SecuredLayout } from "@/shared/components";
import LoginForm from "@/shared/auth/LoginForm";
import useAuthStore from "@/shared/store/useAuthStore";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { currentAccount } = useAuthStore();

    if (!currentAccount)
        return (
            <Page title="Welcome to bid box">
                <Layout>
                    <LoginForm />
                </Layout>
            </Page>
        );

    return (
        <Page title="BidBox">
            <SecuredLayout>
                <h4 className="text-end">Welcome! {currentAccount.userName}</h4>
            </SecuredLayout>
        </Page>
    );
}
