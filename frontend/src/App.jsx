import CartPage from './pages/public/CartPage';
import ProductPage from './pages/public/ProductPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/public/HomePage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import AddProductPage from './pages/seller/AddProductPage';

function App() {
  return (
    <Router>
      {/* The Header sits here so it shows up on every page */}
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <Routes>
          {/* Define our routes here */}
          <Route path="/" element={<HomePage />} />

          {/* Dynamic route for product details */}
          <Route path="/product/:id" element={<ProductPage />} />

          {/* Auth routes */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Cart route */}
          <Route path="/cart" element={<CartPage />} />

          {/* We will add more routes here later! */}
          <Route path="/login" element={<LoginPage />} />

          {/* Seller Dashboard route */}
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;