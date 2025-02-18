import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);

  const handleRemoveBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter((book) => book.id !== id);
    setBookmarks(updatedBookmarks);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Bookmarked Books
      </h1>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarks.map((book) => {
            if (!book || !book.volumeInfo) {
              console.warn("Invalid book data:", book);
              return null;
            }

            const imageUrl =
              book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150";
            const title = book.volumeInfo.title || "No Title";
            const authors = book.volumeInfo.authors?.join(", ") || "Unknown Author";

            return (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 flex flex-col"
              >
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mb-2">{title}</h2>
                  <p className="text-gray-600 mb-4">{authors}</p>
                </div>
                <div className="bg-blue-900 px-6 py-3 flex justify-between items-center text-white text-lg">
                  <Link
                    to={`/book/${book.id}`}
                    className="hover:underline flex items-center"
                  >
                    <i className="fa-solid fa-circle-info mr-2"></i> Details
                  </Link>
                  <button
                    onClick={() => handleRemoveBookmark(book.id)}
                    className="hover:text-red-400 transition duration-300"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-xl">No bookmarks available.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Books
          </Link>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;