import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface LayoutProps {
    children: ReactNode;
}

/// Place your layout definitions here
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default Layout;
