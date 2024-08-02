import React, { useState, useContext } from 'react';
import { login as apiLogin } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container } from 'react-bootstrap';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiLogin(formData);
            login(response.data.access_token);
            alert('Login successful');
        } catch (error) {
            alert('Error logging in');
        }
    };

    return (
        <Container>
            <h2 className="mt-4">Login</h2>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default LoginPage;
