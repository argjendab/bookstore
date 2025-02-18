import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='bg-slate-200 py-12 mt-6'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* About Section */}
          <div>
            <h3 className='text-gray-700 font-title text-xl font-bold mb-4'>About Us</h3>
            <p className='text-gray-500 font-light text-sm'>
              We are a bookstore dedicated to providing the best services and products to our customers. Our mission is to make your life easier and more enjoyable.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className='text-gray-700 font-title text-xl font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li><Link to={'/home'} className='text-gray-700 hover:text-gray-400 transition-colors'>Home</Link></li>
              <li><Link to={'/shop'} className='text-gray-700 hover:text-gray-400 transition-colors'>Shop</Link></li>
              <li><Link to={'/cart'} className='text-gray-700 hover:text-gray-400 transition-colors'>Cart</Link></li>
              <li><Link to={'/dashboard'} className='text-gray-700 hover:text-gray-400 transition-colors'>Dashboard</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className='text-gray-700 font-title text-xl font-bold mb-4'>Newsletter</h3>
            <p className='text-gray-700 text-sm mb-4'>
              Subscribe to our newsletter to get the latest updates and offers.
            </p>
            <form className='flex flex-col space-y-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='p-2 rounded text-gray-800'
              />
              <button
                type='submit'
                className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors'
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className='text-gray-700 font-title text-xl font-bold mb-4'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-700 hover:text-gray-600 transition-colors'>
                <i className=' fab fa-facebook text-2xl'></i>
              </a>
              <a href='#' className='text-gray-700 hover:text-gray-600 transition-colors'>
                <i className='fab fa-twitter text-2xl'></i>
              </a>
              <a href='#' className='text-gray-700 hover:text-gray-600 transition-colors'>
                <i className='fab fa-instagram text-2xl'></i>
              </a>
              <a href='#' className='text-gray-700 hover:text-gray-600 transition-colors'>
                <i className='fab fa-linkedin text-2xl'></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-blue-700 mt-8 pt-8 text-center'>
          <p className='text-gray-700 font-light text-sm'>
            &copy; 2025 BookStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;