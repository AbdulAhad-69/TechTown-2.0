import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext); // <-- Grab the updater from our global bubble

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                { name, email, password },
                { withCredentials: true } 
            );
            
            // INSTANTLY update the global state so the Navbar changes without a refresh!
            setUser(response.data); 
            
            navigate('/add-product'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md font-sans text-center">
            <h2 className="text-2xl font-bold mb-6">TechTown Sign Up</h2>
            {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
            
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    onChange={(e) => setName(e.target.value)} 
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="p-3 bg-black text-white rounded font-bold hover:bg-gray-800 transition">
                    Create Account
                </button>
            </form>

            <div className="mt-6">
                <Link to="/login" className="text-blue-600 hover:underline">
                    Already have an account? Log in
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;