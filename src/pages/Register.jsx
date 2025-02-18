import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import img from '../imgs/books.png'

function Register() {

  const [users, setUsers] = useLocalStorage('users', [])
  const [loggedInUser, setLoggedInUser] = useLocalStorage('user', {})
  const navigate = useNavigate()

  useEffect(() => {
    if(loggedInUser?.username) {
      navigate('/dashboard')
    }
  }, [loggedInUser, navigate])

  const handleRegister = e => {
    e.preventDefault()

    const data = e.target.elements

    const username = data['username'].value
    const password = data['password'].value
    const passwordConfirmation = data['passwordConfirmation'].value

    const user = {
      username,
      password
    }
    
    if (!username || !password || !passwordConfirmation) {
      alert('All fields are required!');
      return;
    }

    // Check if passwords match
    if (password !== passwordConfirmation) {
      alert('Passwords do not match!');
      return;
    }
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      alert('User already exists!');
      return;
    }

    // Create new user object
    const newUser = { username, password };

    // Update users array in local storage
    setUsers([...users, newUser]);

    // Redirect to login page
    navigate('/login');
    } 

    return (
      <div className='flex gap-20 items-center justify-center min-h-screen w-full'>
        <div className=''>
          <img src={img} className="w-[450px]" />
        </div>
        <div className="w-full max-w-sm mx- my-10 overflow-hidden rounded-lg shadow-md bg-slate-200">
          <div className="px-6 py-4 ">
            <h3 className="mt-3 text-xl font-medium text-center text-black ">
              Welcome!
            </h3>
            <p className="mt-1 text-center text-black">
              Create your account
            </p>
    
            <form onSubmit={handleRegister}>
              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg"
                  type="text"
                  id="username"
                  placeholder="Username"
                />
              </div>
    
              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg"
                  type="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg"
                  type="password"
                  id="passwordConfirmation"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="flex items-center justify-center mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium tracking-wide text-white bg-blue-900 hover:bg-blue-800 rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
    
          <div className="flex items-center justify-center py-4 text-center ">
            <span className="text-sm text-black">
              Already have an account?
            </span>
            <a href="#" className="mx-2 text-sm font-bold text-blue-900 hover:underline">
              Login here!
            </a>
          </div>
        </div>
      </div>
    );
    
};

export default Register