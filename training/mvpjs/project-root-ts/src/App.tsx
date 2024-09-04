import React, { useState, useEffect } from 'react';

import Page from './components/Page';
import './styles/styles.css';

const App: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentSection, setCurrentSection] = useState('login');
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchProperties();
        }
    }, [isLoggedIn]);

    const showSection = (section: string) => {
        setCurrentSection(section);
    };

    const login = () => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                setIsLoggedIn(true);
                showSection('home');
            } else {
                alert('Login failed');
            }
        });
    };

    const logout = () => {
        setIsLoggedIn(false);
        alert('Logged out');
        showSection('login');
    };

    const handlePropertySubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const address = (event.target as HTMLFormElement).elements.namedItem('property-address') as HTMLInputElement;
        const value = (event.target as HTMLFormElement).elements.namedItem('property-value') as HTMLInputElement;

        const response = await fetch('/add-property', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ address: address.value, value: value.value })
        });

        const result = await response.json();
        if (result.success) {
            alert('Property added successfully!');
            fetchProperties();
        } else {
            alert('Failed to add property');
        }
    };

    const fetchProperties = async () => {
        const response = await fetch('/properties');
        const properties = await response.json();
        setProperties(properties);
    };

    const displayProperties = () => {
        return properties.map(property => (
            <div key={property.id} className="property-item">
                <strong>Property ID:</strong> {property.id}<br />
                <strong>Address:</strong> {property.address}<br />
                <strong>Value:</strong> {property.value}<br />
            </div>
        ));
    };

    return (
        <div>
            {isLoggedIn ? (
       <div class="main-menu">
            <a href="#" onclick="showSection('home')">Home</a>
            <a href="#" onclick="showSection('borrower')">Borrower Dashboard</a>
            <a href="#" onclick="showSection('lender')">Lender Dashboard</a>
            <a href="#" onclick="showSection('real-estate')">Real Estate Properties</a>
            <!-- <a href="#" onclick="logout()">Logout</a> -->
        </div>
            
                <>
                    <button onClick={logout}>Logout</button>
                    <div className={currentSection === 'home' ? 'section' : 'section hidden'}>
                        <h2>Home Section</h2>
                        {/* Content for Home */}
                    </div>
                    <div className={currentSection === 'properties' ? 'section' : 'section hidden'}>
                        <h2>Properties</h2>
                        {displayProperties()}
                        <form id="property-form" onSubmit={handlePropertySubmit}>
                            <input type="text" id="property-address" placeholder="Property Address" required />
                            <input type="number" id="property-value" placeholder="Property Value" required />
                            <button type="submit">Add Property</button>
                        </form>
                    </div>
                </>
            ) : (
                <div id="login-form">
                    <h2>Login</h2>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button onClick={login}>Login</button>
                </div>
            )}
        </div>
    );
};

export default App;


/*
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
*/
