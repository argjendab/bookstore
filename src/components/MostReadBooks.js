import React, { useState, useEffect } from 'react';
import Card from './Cards'
import { useLocalStorage } from '@uidotdev/usehooks';

const BooksAPI = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart]=useLocalStorage('cart', []);
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const apiKey = 'AIzaSyBOS4XYPGmMRZt_X5g9tAZ3XFfjLMBsSso';
        const query = 'react';
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        setBooks(data.items || []); // Directly set the books without prices
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 my-16">
      <h1 className="text-3xl font-bold text-center mb-8">Most read React books</h1>
      <div className="flex flex-wrap justify-center mx-10 gap-9">
        {
        books && books.map((book) => (
          <Card key={book.id} book={book} /> // Use the Card component here
        ))}
      </div>
    </div>
  );
};

export default BooksAPI;