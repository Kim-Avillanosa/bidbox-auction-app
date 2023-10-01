import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

/// Place your layout definitions here
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false} />
            {children}
        </>
    );
};

export default Layout;
