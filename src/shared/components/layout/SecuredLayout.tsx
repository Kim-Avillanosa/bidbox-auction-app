import useAuthStore from "@/shared/store/useAuthStore";
import AppBar from "./AppBar";
import { ReactNode } from "react";
import { useEffect, useState } from "react";
import useSWR, { SWRConfig } from "swr";
import useAxiosClient from "@/services/useAxiosClient";

import { Container } from "react-bootstrap";
import ModalProvider from "./ModalProvider";
import ErrorBoundary from "./ErrorBoundary";
import AuthVerify from "@/shared/auth/AuthVerify";
import OnLoadAnimator from "@/shared/components/layout/OnLoadAnimator";

interface SecuredLayoutProps {
    children: ReactNode;
}

/// Place your layout definitions here
const SecuredLayout: React.FC<SecuredLayoutProps> = ({ children }) => {
    const { currentAccount } = useAuthStore();

    if (!currentAccount) return "Your are not authenticated, please login";

    return (
        <SWRConfig
            value={{
                refreshInterval: 3000,
                fetcher: (resource, init) =>
                    fetch(resource, init).then((res) => res.json()),
            }}
        >
            <AppBar />
            <Container className="mt-3">
                <ErrorBoundary>
                    <OnLoadAnimator>{children}</OnLoadAnimator>
                </ErrorBoundary>
            </Container>
            <AuthVerify />
            <ModalProvider />
        </SWRConfig>
    );
};

export default SecuredLayout;
