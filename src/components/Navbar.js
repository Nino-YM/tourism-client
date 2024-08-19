import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavigationBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Office de Tourisme d'Angers</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
                        <Nav.Link as={Link} to="/events">Événements</Nav.Link>
                        <Nav.Link as={Link} to="/reviews">Avis</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <Nav.Link onClick={logout}>Déconnexion</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
                                <Nav.Link as={Link} to="/register">Inscription</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
