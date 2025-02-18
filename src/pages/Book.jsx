import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Cards';

function Book() {
  const [cart, setCart] = useLocalStorage('cart', []);
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if (!response.ok) throw new Error('Failed to fetch book data!');
        
        const data = await response.json();
        setBook(data);
        console.log("Book Data:", data); // Debugging log
      } catch (error) {
        console.error('Error fetching the book:', error);
        navigate('/shop');
      }
    };

    fetchBook();
  }, [id]);

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

    alert(`${book.volumeInfo?.title} was added to cart`);
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
    <div className="container mx-auto my-12">
      {book && (
        <div className="grid grid-cols-2">
          <img 
            src={book.volumeInfo?.imageLinks?.large || 'https://via.placeholder.com/150'} 
            alt={book.volumeInfo?.title}
            className='h-[75vh] mx-auto' 
          />
          <div>
            <h1 className="text-2xl font-semibold uppercase">{book.volumeInfo?.title}</h1>
            <p
  className="my-6"
  dangerouslySetInnerHTML={{
    __html: book.volumeInfo?.description
      ? book.volumeInfo.description.substring(0, 1300) + '...' // Limit to 20 characters
      : 'No description available', // Fallback if description is missing
  }}
/>
            <p className="my-6">Published: {book.volumeInfo?.publishedDate}</p>
            <hr />
            <div className="mt-6 flex gap-6 items-center">
              <button 
                onClick={handleAddToCart} 
                className="bg-white border px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBookmark} 
                className="bg-white border px-4 py-2 rounded-lg hover:bg-red-200 text-red-500"
              >
                Bookmark
              </button>
            </div>
          </div>
        </div>
      )}
      

    </div>
  );
}

export default Book;
