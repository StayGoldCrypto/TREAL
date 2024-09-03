import React from 'react';
import Page from './components/Page';
import './styles/styles.css';

const App: React.FC = () => {
    const content = (
        <div>
            <h1>Welcome to My Spectacular Website</h1>
            <p>This is the home page of my awesome website.</p>
        </div>
    );

    return <Page title="My Spectacular Website" content={content} />;
};

export default App;
