import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <Link to="/" className="shrink-0 flex items-center gap-2 hover:opacity-80 transition">
                        <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-bold text-xl">
                            T
                        </div>
                        <span className="font-bold text-xl tracking-tight">TechTown</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex space-x-6 items-center">
                        <Link to="/" className="hover:text-blue-400 transition font-medium">Shop</Link>

                        {/* 3. YOUR CART LINK GOES RIGHT HERE! */}
                        <Link to="/cart" className="relative hover:text-blue-400 transition font-medium flex items-center gap-1">
                            <span>Cart</span>
                            {cart.length > 0 && (
                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {cart.reduce((total, item) => total + item.qty, 0)}
                                </span>
                            )}
                        </Link>

                        {/* CONDITIONAL RENDERING for Auth */}
                        {user ? (
                            <>
                                {(user.role === 'seller' || user.role === 'admin') && (
                                    <Link to="/add-product" className="hover:text-blue-400 transition font-medium text-yellow-400">
                                        Seller Dashboard
                                    </Link>
                                )}

                                <span className="text-gray-400 border-l border-gray-600 pl-4">Hello, {user.name}</span>

                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-600 px-4 py-2 rounded-lg font-bold hover:bg-red-500 transition shadow-md"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="bg-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition shadow-md">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;