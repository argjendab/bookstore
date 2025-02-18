import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks';

const Card = ({ book }) => {
  const [cart, setCart] = useLocalStorage('cart', []);
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  const [qty, setQty] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    if (!book) return;

    const exists = cart.some(item => item.id === book.id);
    if (exists) {
      setCart(cart.map(item => 
        item.id === book.id ? { ...item, qty: item.qty + qty } : item
      ));
    } else {
      setCart([...cart, { ...book, qty }]);
    }

    alert(`${book.volumeInfo.title} was added to cart`);
  };

  const handleBookmark = () => {
    if (!book) return;

    const exists = bookmarks.some(item => item.id === book.id);
    if (exists) {
      alert(`${book.volumeInfo?.title} is already bookmarked!`);
    } else {
      setBookmarks([...bookmarks, book]);
      alert(`${book.volumeInfo?.title} was added to bookmarks`);
    }
  };

  return (
    <div className="bg-slate-100 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-[400px] flex flex-col">
      <img
        src={book.volumeInfo.imageLinks?.smallThumbnail ? book.volumeInfo.imageLinks?.smallThumbnail : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMmyTPv4M5fFPvYLrMzMQcPD_VO34ByNjouQ&s`}
        alt={book.volumeInfo.title}
        className="w-1/2 h-48 object-cover mx-auto"
      />
      <div className="p-4 flex flex-col flex-grow justify-center">
        <h2 className="text-xl font-semibold mb-2">{book.volumeInfo.title}</h2>
        <p className="text-gray-600 mb-2">
          {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
        </p>
      </div>
      <div className="mt-auto bg-blue-900 px-6 py-2 flex justify-between items-center gap-2 text-white text-xl">
        <p>${book.volumeInfo.pageCount / 10}</p>
        <div className='flex gap-2 text-2xl'>
          <button onClick={handleAddToCart} className='transition-transform duration-500 ease-in-out hover:scale-150 trans'>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <button onClick={handleBookmark} className='transition-transform duration-500 ease-in-out hover:scale-150'>
            <i className="fa-solid fa-heart"></i>
          </button>
          <Link to={`/book/${book.id}` } className='transition-transform duration-500 ease-in-out hover:scale-150'>
            <i className="fa-solid fa-circle-info"></i>
          </Link>
            
          
        </div>
      </div>
    </div>
  );
};

export default Card;
