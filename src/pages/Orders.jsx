import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Orders() {
  const [orders, setOrders] = useLocalStorage('orders', []);
  const [myOrders, setMyOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useLocalStorage('user', {});
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!loggedInUser.username) {
      navigate('/login');
    }

    // Filter orders for the logged-in user
    const filteredOrders = orders.filter(
      (order) => (order.user.username === loggedInUser.username)
    );
    setMyOrders(filteredOrders);
  }, []); // Add dependencies

    // Function to clear orders for the logged-in user
    const handleClearOrders = () => {
      toast.success('All orders are cleared :)')
      const updatedOrders = orders.filter(
        (order) => order.user.username !== loggedInUser.username
      );
      setOrders(updatedOrders); // Update localStorage
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setMyOrders([]); // Clear the displayed orders
    };
  
  return (
    
    <div className="container mx-auto my-12">
      <h1 className="text-2xl font-bold mb-8">Books Ordered</h1>

      {/* <p className="text-gray-600 text-lg my-5">
          You have {myOrders?.length || 0} order(s).
        </p> */}
      {myOrders.length > 0 ? (
        <div className="flex flex-wrap gap-6 ">

          {myOrders.map((order, index) => (
            order.items.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-3 bg-slate-100 p-4 rounded-lg shadow-lg hover:shadow-xl hover:shadow-slate-400 transition-transform hover:scale-105 duration-300 max-w-[400px] "
              >
                {/* Book Image */}
                <img 
                  src={item.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg'} 
                  alt={item.volumeInfo.title} 
                  className="w-24 h-36 object-cover rounded-md"
                />
                {/* Book Details */}
                <div className=" flex flex-col gap-2 justify-between">
                  <p className="font-semibold text-lg">Title: {item.volumeInfo.title}</p>
                  <p className="text-gray-600 text-sm">
                    Category: {item.volumeInfo.categories ? item.volumeInfo.categories[0] : "N/A"}
                  </p>
                  
                  <p className="text-blue-600 font-medium">
                    <p className='text-black'>Quantity: {item.qty}</p>
                    Price: ${item.volumeInfo.pageCount ? ((item.volumeInfo.pageCount / 10) * (item.qty)).toFixed(2) : "N/A"} 
                  </p>
                    
                 
                </div>
              </div>
              
            ))
          ))}
        </div>
      ) : (
        <p className='text-gray-600'>No orders found.</p>
      )}
       {myOrders.length > 0 && (
        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleClearOrders}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Clear All Orders
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;