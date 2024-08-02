import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (isAuthenticated) {
                try {
                    const userId = localStorage.getItem('user_id');
                    const response = await api.get(`/users/${userId}`);
                    setUser(response.data);
                } catch (error) {
                    setIsAuthenticated(false);
                }
            }
        };

        fetchUserProfile();
    }, [isAuthenticated]);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user.id_user);
        setIsAuthenticated(true);
        setUser(user);
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
