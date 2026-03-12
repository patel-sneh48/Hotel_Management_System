import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const res = await fetch('http://localhost:5000/api/auth/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    if (res.ok && data.success) {
                        setUser(data);
                    } else if (res.status === 401 || res.status === 403) {
                        // Only log out if the server explicitly rejects the token
                        logout();
                    }
                } catch (error) {
                    console.error('Failed to fetch user (network error or server down)', error);
                    // Do NOT logout here, it might just be a temporary network issue
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, [token]);

    const register = async (name, email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setUser(data);
                navigate('/');
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'An error occurred during registration' };
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setUser(data);
                navigate('/');
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'An error occurred during login' };
        }
    };

    const loginWithGoogle = async (credential) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setUser(data);
                navigate('/');
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'An error occurred during Google login' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        token,
        loading,
        register,
        login,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
