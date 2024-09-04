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

const Menu: React.FC = () => {
    return (
        <Navbar bg="dark" expand="lg">
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

export default Menu;
