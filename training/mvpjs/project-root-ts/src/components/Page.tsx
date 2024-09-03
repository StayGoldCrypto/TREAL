import React from 'react';
import Menu from './Menu';

interface PageProps {
    title: string;
    content: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, content }) => {
    return (
        <div>
            <head>
                <title>{title}</title>
            </head>
            <body>
                <Menu />
                <div className="container">
                    <div className="content">
                        {content}
                    </div>
                </div>
            </body>
        </div>
    );
};

export default Page;
