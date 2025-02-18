import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import toast from 'react-hot-toast';

function Cart() {
	const [cart, setCart] = useLocalStorage('cart', [])
	const [orders, setOrders] = useLocalStorage('orders', [])
	const [loggedInUser, setLoggedInUser] = useLocalStorage('user', {})

	const handleQtyDec = e => {
		const id = e.target.getAttribute('book-id')

		setCart([...cart.map(item => {
			if(item.id == id) {
				if(item.qty > 1) 
					return {...item, qty: item.qty - 1}
				return {}
			} else {
				return item
			}
		})])
	}

	const handleQtyInc = e => {
		const id = e.target.getAttribute('book-id')
		
		setCart([...cart.map(item => {
			if(item.id == id)
				return {...item, qty: item.qty + 1}
			return item
		})])
	}

	const handleCheckout = e => {
		const order = {
			user: loggedInUser,
			items: cart.filter(item => item?.id)
		}
		setOrders(prevOrders => [...(Array.isArray(prevOrders) ? prevOrders : []), order])


		setCart([])

		toast.success(`Order was completed successfully.`)
	}
//grid grid-cols-4 gap-y-20 my-4 justify-center items-center gap-14 border border-gray-300 py-7 rounded-xl
return (
	<div className='container mx-auto my-12 px-4'>
	  <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-8'>Your Cart</h1>
	  <div className='my-12'>
		{cart.filter(item => item?.id).length > 0 ? (
		  <>
			<div className='flex flex-row flex-wrap gap-5 justify-center'>
			  {cart.map((item) => {
				if (item?.id) {
				  return (
					<div key={item.id} className='bg-slate-100 w-3/1 rounded-lg shadow-lg hover:shadow-xl hover:shadow-slate-400 transition-shadow duration-300 item p-6 my-2 flex gap-5 max-w-[450px]'>
					  <img 
						src={item.volumeInfo.imageLinks.smallThumbnail} 
						alt={item.volumeInfo.title} 
						className='w- h-48 object-contain mb-4 rounded-lg'
					  />
					  <div className='flex flex-col justify-center gap-4'>
					  <h4 className='text-xl font-semibold'>{item.volumeInfo.title}</h4>
					  <p className='text-lg'>Price: ${(item.volumeInfo.pageCount / 10).toFixed(2)}</p>
					  <div className='flex gap-4 items-center justify-between'>
						<div className='flex items-center gap-2'>
						  <button 
							onClick={handleQtyDec} 
							book-id={item.id} 
							className=' bg-blue-900 dark:text-gray-300 rounded-lg w-8 h-8 flex items-center justify-center hover:bg-blue-800'
						  >
							-
						  </button>
						  
						  <button 
							onClick={handleQtyInc} 
							book-id={item.id} 
							className='bg-blue-900 dark:text-gray-300 rounded-lg w-8 h-8 flex items-center justify-center hover:bg-blue-800'
						  >
							+
						  </button>
						  <span className='text-lg'>{item.qty}</span>
						</div>
						
					  </div>
					  <p className='text-lg font-semibold'>
						  ${((item.volumeInfo.pageCount / 10) * item.qty).toFixed(2)}
						</p>
					  </div>
					  
					</div>
				  );
				}
				return null;
			  })}
			</div>
  
			{/* Total Price of All Books */}
			<div className='mt-12 border-t border-gray-200 dark:border-gray-700 pt-8'>
			  <div className='flex justify-end gap-5'>
			  <div>
							<p className='text-lg font-bold'>
							Total: ${
								cart.filter(item => item?.id).reduce((total, item) => total + (item.qty * (item.volumeInfo.pageCount / 10)), 0)
								.toFixed(2)
							}</p>
							<div>
								
							
			  </div>
			  </div>
							{
                    (loggedInUser?.username && cart.filter(item => item?.id).length > 0) && <button onClick={handleCheckout} className=" bg-white flex items-center text-gray-700 dark:text-gray-300 justify-center gap-x-3  text-sm sm:text-base  dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2">Checkout</button>
		}
						</div>
			</div>
		  </>
		) : (
		  <div className='text-center py-12'>
			<p className='text-xl text-gray-900 dark:text-gray-300'>Your cart is empty. Take a look at our shop and find your preferred book :)</p>
		  </div>
		)} 
				
	  </div>
	</div>
  );
}

/* {
					
				}*/
export default Cart