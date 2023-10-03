import React from "react";
import { NextPageContext } from "next";
import { Layout, Page } from "@/shared/components";

interface ErrorPageProps {
    statusCode?: number;
}

class ErrorPage extends React.Component<ErrorPageProps> {
    static getInitialProps({ res, err }: NextPageContext) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
        return { statusCode };
    }

    render() {
        const { statusCode } = this.props;
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
    }
}

export default ErrorPage;
