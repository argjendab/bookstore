import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Book from "./pages/Book";
import Cart from "./pages/Cart";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Header from "./components/Header";
import toast,  { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";

function App() {

  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <div><Toaster /></div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;