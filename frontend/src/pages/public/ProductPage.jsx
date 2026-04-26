import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from "../../context/CartContext";

const ProductPage = () => {
    const { id } = useParams(); // Grabs the ID from the URL!
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch the single product by ID
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Product not found');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="flex justify-center mt-20 text-xl font-bold">Loading product...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 font-bold">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <Link to="/" className="text-blue-600 hover:underline mb-8 inline-block">&larr; Back to Shop</Link>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Left Side: Big Image */}
                <div className="md:w-1/2 p-8 bg-gray-50 flex justify-center items-center">
                    <img src={product.image} alt={product.name} className="max-h-96 object-contain" />
                </div>
                
                {/* Right Side: Details */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">{product.brand}</p>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>
                    
                    {/* Assuming you added a description field to your backend model. If not, this just stays blank! */}
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description || "No description available for this product."}
                    </p>
                    
                    <button 
                        onClick={() => addToCart(product)}
                        className="bg-black text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-800 transition w-full md:w-auto"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;