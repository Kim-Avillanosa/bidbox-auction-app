import { Toaster } from "react-hot-toast";
interface LayoutProps {
    children: React.ReactNode;
}

/// Place your layout definitions here
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </>
    );
};

export default Layout;
