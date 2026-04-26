import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // Stores the actual file

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // 1. We must use FormData to send files (images)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('countInStock', stock);
        formData.append('description', description);
        formData.append('image', image); // Append the file!

        try {
            // 2. Send it to the backend (withCredentials ensures our cookie goes with it)
            await axios.post('http://localhost:5000/api/products', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setLoading(false);
            navigate('/'); // Sweep them back to the shop to see their new product!
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to upload product');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Add New Product</h1>

                {error && <div className="bg-red-50 text-red-500 p-4 rounded mb-6 font-bold text-center">{error}</div>}

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                            <input type="text" required onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
                            <input type="text" required onChange={(e) => setBrand(e.target.value)} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                            <input type="number" step="0.01" required onChange={(e) => setPrice(e.target.value)} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
                            <input type="number" required onChange={(e) => setStock(e.target.value)} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                        <input type="text" required onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Electronics, Laptops, Accessories" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                        <textarea rows="4" required onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                    </div>

                    <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                        <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                            <span className="block text-sm font-bold text-gray-700 mb-4">Product Image</span>

                            {/* Our Custom "Choose File" Button */}
                            <span className="bg-black text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-800 transition mb-3 shadow-sm">
                                Browse Files
                            </span>

                            {/* Dynamic Text: Shows the file name if selected, or "No file chosen" if empty */}
                            <span className="text-sm font-medium text-gray-500">
                                {image ? image.name : "No file chosen"}
                            </span>

                            <p className="text-xs text-gray-400 mt-2">JPEG, PNG, or WebP</p>

                            {/* The REAL input is hidden out of sight, but clicking the label triggers it! */}
                            <input
                                type="file"
                                accept="image/*"
                                required
                                onChange={(e) => setImage(e.target.files[0])}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-lg font-bold text-white text-lg transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                    >
                        {loading ? 'Uploading to Cloudinary...' : 'Publish Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;