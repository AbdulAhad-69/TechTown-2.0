import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Context
export const AuthContext = createContext();

// Create the Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // When the app first loads, check if we have a valid cookie!
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    withCredentials: true 
                });
                setUser(response.data); // Save the user profile to global state
            } catch (error) {
                setUser(null); // No cookie, or cookie expired
            } finally {
                setLoading(false); // Done checking
            }
        };
        checkLoggedIn();
    }, []);

    // The Logout function
    const logout = async () => {
        try {
            // (We will add a backend /logout route later to clear the cookie, 
            // but for now, just clearing the React state works for the UI)
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};