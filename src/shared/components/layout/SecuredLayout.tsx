import useAuthStore from "@/shared/store/useAuthStore";
import AppBar from "./AppBar";
import { ReactNode } from "react";

import { Container } from "react-bootstrap";
import ModalProvider from "./ModalProvider";
import { Toaster } from "react-hot-toast";

interface SecuredLayoutProps {
    children: ReactNode;
}

/// Place your layout definitions here
const SecuredLayout: React.FC<SecuredLayoutProps> = ({ children }) => {
    const { currentAccount } = useAuthStore();

    if (!currentAccount) return "Your are not authenticated, please login";

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <AppBar />
            <Container className="mt-3">{children}</Container>
            <ModalProvider />
        </>
    );
};

export default SecuredLayout;
