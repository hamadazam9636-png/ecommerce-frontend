import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AdminDashboard from './components/AdminDashboard'
import Home from './pages/Home'
import Products from './pages/ProductsPage'
import About from './pages/AboutPage'
import Contact from './pages/ContactPage'
import Cart from './pages/Cart'
import Account from './pages/Account'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
