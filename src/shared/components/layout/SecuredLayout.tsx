import useAuthStore from "@/shared/store/useAuthStore";
import AppBar from "./AppBar";
import { ReactNode } from "react";

import { Container } from "react-bootstrap";
import ModalProvider from "./ModalProvider";
import ErrorBoundary from "./ErrorBoundary";
import AuthVerify from "@/shared/auth/AuthVerify";
import OnLoadAnimator from "@/shared/components/layout/OnLoadAnimator"

interface SecuredLayoutProps {
    children: ReactNode;
}

/// Place your layout definitions here
const SecuredLayout: React.FC<SecuredLayoutProps> = ({ children }) => {
    const { currentAccount } = useAuthStore();

    if (!currentAccount) return "Your are not authenticated, please login";

    return (
        <>
            <AppBar />
            <Container className="mt-3">
                <ErrorBoundary>
                    <OnLoadAnimator>{children}</OnLoadAnimator>
                </ErrorBoundary>
            </Container>
            <AuthVerify />
            <ModalProvider />
        </>
    );
};

export default SecuredLayout;
