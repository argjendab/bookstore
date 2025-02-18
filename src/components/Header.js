import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  const [cart, setCart] = useLocalStorage('cart', [])
  const [loggedInUser, setLoggedInUser] = useLocalStorage('user', {})
  const navigate = useNavigate()

  const handleLogout = e => {
    if(loggedInUser?.username) {
      setLoggedInUser(null)
      navigate('/')
    }
  }

  return (
    <header className='bg-blue-950 text-white py-6'>
        <div className='container mx-auto text-center'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-3 '>
            <svg className='h-8 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
            </svg>
            <h1 className='text-2xl'>BookStore</h1>
            </div>
            <div className=''>
          <nav className=''>
          <ul className='flex gap-6'>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart ({cart.filter(item => item?.id).length})</Link></li>
            {
              (loggedInUser?.username) ? (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )
            }
            
            
          </ul>
          </nav>
          </div>
          </div>
            
          

        </div>
    </header>
  )
}

export default Header