import { NextPageContext } from "next";
import { Layout, Page } from "@/shared/components";

interface ErrorPageProps {
    statusCode?: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
    let message = "An error occurred";

    if (statusCode === 404) {
        message = "Page not found";
    }

    return (
        <Page title="Error">
            <Layout>
                <p>{message}</p>
                <p>{statusCode ? `Status Code: ${statusCode}` : ""}</p>
            </Layout>
        </Page>
    );
};

export async function getServerSideProps({ res, err }: NextPageContext) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { props: { statusCode } };
}

export default ErrorPage;