import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MenuProvider } from './context/MenuContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import MenuPage from './components/Menu/MenuPage';
import GalleryPage from './components/Gallery/GalleryPage';
import BlogPage from './components/Blog/BlogPage';
import AboutPage from './components/About/AboutPage';
import CartPage from './components/Cart/CartPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MenuProvider>
          <Router>
            <div className="App">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </MenuProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;