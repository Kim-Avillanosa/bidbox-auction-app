import { NextPageContext } from "next";
import { Layout, Page } from "@/shared/components";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "react-bootstrap";

interface ErrorPageProps {
    statusCode?: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
    const router = useRouter();

    let message = "An error occurred please reload the page";

    if (statusCode === 404) {
        message = "Page not found";
    }

    return (
        <Page title="Error">
            <Layout>
                <p className="m-5">
                    {message}{" "}
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => {
                            localStorage.clear();

                            router.reload();
                        }}
                    >
                        Reload
                    </Button>
                </p>
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
