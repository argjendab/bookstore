import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import Card from '../components/Cards'; // Import the Card component

const Shop = () => {
  const [page, setPage] = useState(1);
  const [book, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const booksPerPage = 15;

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
            <Card key={book.id} book={book} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePrevButtonClick}
            disabled={page === 1}
            className="mx-1 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

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
