import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

interface MenuItem {
    label: string;
    link: string;
}

const menuItems: MenuItem[] = [
    { label: 'Borrowers', link: 'https://sabitashop.in/test/mvpjs/borrowers/' },
    { label: 'Loan Application', link: 'https://sabitashop.in/test/mvpjs/loanapp/' },
    { label: 'Loan Disbursement', link: 'https://sabitashop.in/test/mvpjs/loandisa/' },
    { label: 'Login', link: 'https://sabitashop.in/test/mvpjs/login/' },
    { label: 'NFT', link: 'https://sabitashop.in/test/mvpjs/NFT/' },
    { label: 'Properties', link: 'https://sabitashop.in/test/mvpjs/properties/' },
    { label: 'Real Estate Acquisition', link: 'https://sabitashop.in/test/mvpjs/realstateadq/' },
    { label: 'Register', link: 'https://sabitashop.in/test/mvpjs/register/' },
    { label: 'Token', link: 'https://sabitashop.in/test/mvpjs/token/' },
];

const MenuDark: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#">My Dark Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-dark" />
            <Navbar.Collapse id="navbar-dark">
                <Nav className="mr-auto">
                    {menuItems.map((item, index) => (
                        <Nav.Link key={index} href={item.link}>{item.label}</Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

/*
const Menu: React.FC = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">My Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {menuItems.map((item, index) => (
                        <Nav.Link key={index} href={item.link}>{item.label}</Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


const MenuLight: React.FC = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand href="#">My Light Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-light" />
            <Navbar.Collapse id="navbar-light">
                <Nav className="mr-auto">
                    {menuItems.map((item, index) => (
                        <Nav.Link key={index} href={item.link}>{item.label}</Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const MenuPrimary: React.FC = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="#">My Primary Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-primary" />
            <Navbar.Collapse id="navbar-primary">
                <Nav className="mr-auto">
                    {menuItems.map((item, index) => (
                        <Nav.Link key={index} href={item.link}>{item.label}</Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const MenuGradient: React.FC = () => {
    return (
        <Navbar expand="lg" style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
            <Navbar.Brand href="#">Gradient Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-gradient" />
            <Navbar.Collapse id="navbar-gradient">
                <Nav className="mr-auto">
                    {menuItems.map((item, index) => (
                        <Nav.Link key={index} href={item.link} style={{ color: '#fff' }}>{item.label}</Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
const MenuTransparent: React.FC = () => {
    return (
        <Navbar expand="lg" style={{ background: 'transparent' }}>
            <Navbar.Brand href="#">Transparent Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-transparent" />
            <Navbar.Collapse id="navbar-transparent">
                <Nav className="mr-auto">
                    {menuItems.map((item, index) => (
                        <Nav.Link key={index} href={item.link}>{item.label}</Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

*/

export default Menu;
