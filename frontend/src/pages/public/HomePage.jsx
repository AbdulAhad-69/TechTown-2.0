import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen text-2xl font-bold text-gray-600">Loading TechTown...</div>;
    if (error) return <div className="text-center mt-10 text-red-500 font-bold text-xl">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
                Welcome to <span className="text-blue-600">TechTown</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 text-lg">No products found. Login as a seller to add some!</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">

                            {/* We wrap the image in a Link */}
                            <Link to={`/product/${product._id}`} className="h-48 overflow-hidden bg-gray-100 shrink-0 cursor-pointer block">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                                />
                            </Link>

                            <div className="p-5 flex flex-col grow">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{product.brand}</p>

                                {/* We also wrap the title in a Link */}
                                <Link to={`/product/${product._id}`}>
                                    <h3 className="text-lg font-bold text-gray-900 truncate mb-2 hover:text-blue-600 transition cursor-pointer">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="mt-auto">
                                    <p className="text-2xl font-extrabold text-gray-900 mb-4">${product.price}</p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;