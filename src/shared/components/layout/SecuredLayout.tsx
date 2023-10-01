import useAuthStore from "@/shared/store/useAuthStore";
import AppBar from "./AppBar";

import { Container } from "react-bootstrap";
import ModalProvider from "./ModalProvider";

interface SecuredLayoutProps {
    children: React.ReactNode;
}

/// Place your layout definitions here
const SecuredLayout: React.FC<SecuredLayoutProps> = ({ children }) => {
    const { currentAccount } = useAuthStore();

    if (!currentAccount) return "Your are not authenticated, please login";

    return (
        <>
            <AppBar />
            <Container className="mt-3">{children}</Container>
            <ModalProvider />
        </>
    );
};

export default SecuredLayout;
