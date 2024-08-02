import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavigationBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Angers Tourism</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
                    <Nav.Link as={Link} to="/events">Events</Nav.Link>
                    <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link>
                </Nav>
                <Nav>
                    {isAuthenticated ? (
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
