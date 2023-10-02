import React from 'react';
import { NextPageContext } from 'next';

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
        let message = 'An error occurred';

        if (statusCode === 404) {
            message = 'Page not found';
        }

        return (
            <div>
                <h1>{message}</h1>
                <p>{statusCode ? `Status Code: ${statusCode}` : ''}</p>
            </div>
        );
    }
}

export default ErrorPage;