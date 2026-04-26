import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartPage = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    // Calculate the total price of everything in the cart
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Your Cart is Empty</h2>
                <Link to="/" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-500 transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side: Cart Items */}
                <div className="lg:w-2/3">
                    {cart.map((item) => (
                        <div key={item._id} className="flex items-center gap-6 bg-white p-4 rounded-xl shadow-sm mb-4 border border-gray-100">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-contain bg-gray-50 rounded" />
                            
                            <div className="grow">
                                <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-900 hover:text-blue-600">
                                    {item.name}
                                </Link>
                                <p className="text-gray-500">{item.brand}</p>
                                <p className="text-lg font-extrabold mt-1">${item.price}</p>
                            </div>

                            <div className="text-center font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded">
                                Qty: {item.qty}
                            </div>

                            <button 
                                onClick={() => removeFromCart(item._id)}
                                className="text-red-500 hover:text-red-700 font-bold px-4 py-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                        
                        <div className="flex justify-between border-b pb-4 mb-4">
                            <span className="text-gray-600">Subtotal ({cart.reduce((a, c) => a + c.qty, 0)} items)</span>
                            <span className="font-bold">${calculateTotal()}</span>
                        </div>
                        
                        <button className="w-full bg-black text-white py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;