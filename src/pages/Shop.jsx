import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';

const Shop = () => {
  const [page, setPage] = useState(1);
  const [book, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const booksPerPage = 15;
  const [cart, setCart] = useLocalStorage('cart', []);
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const apiKey = 'AIzaSyBOS4XYPGmMRZt_X5g9tAZ3XFfjLMBsSso';
        const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}&startIndex=${(page - 1) * booksPerPage}&maxResults=${booksPerPage}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch books!");

        const data = await response.json();
        setBooks(data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [page, searchQuery]);

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      const search = e.target.value;
      setSearchQuery(search);
      setPage(1); // Reset to the first page when searching
    }
  };

  const handlePrevButtonClick = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleNextButtonClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
    <div className='flex'>
<div className="p-6 my-16">
    
    <h1 className="text-3xl font-bold text-center mb-8">Search for your favorite book</h1>

    {/* Search Bar */}
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Search by title..."
        onKeyUp={handleSearch}
        className="px-4 py-2 border border-gray-300 rounded-lg w-1/2"
      />
    </div>

    {/* Book List */}
    <div className="flex flex-wrap justify-center mx-10 gap-9">
      {book.map((book) => (
        <div key={book.id} className="bg-slate-100 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-[400px] flex flex-col">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
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
      ))}
    </div>

    {/* Pagination */}
    <div className="flex justify-center mt-8">
      {/* Previous Button */}
      <button
        onClick={handlePrevButtonClick}
        disabled={page === 1}
        className="mx-1 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>

      {/* Next Button */}
      <button
        onClick={handleNextButtonClick}
        disabled={book.length < booksPerPage}
        className="mx-1 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
    </div>
    
  );
};

export default Shop;