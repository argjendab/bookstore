import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from  '../imgs/books.png'
import toast from 'react-hot-toast';

function Login() {
  

  const [users, setUsers]  = useLocalStorage('users', [])
  const [loggedInUser, setLoggedInUser] = useLocalStorage('user', {})
  const navigate = useNavigate()

  useEffect(() =>  {
    if(loggedInUser?.username)  {
      navigate('/dashboard')
    }
  }, [])

  const handleLogin = e => {
    e.preventDefault();
  
    const data = e.target.elements;
    const username = data["username"].value;
    const password = data["password"].value;
  
    const user = users.find(item => item.username === username);
  

    if(!username || !password) {
      toast.error('All fields are required!');
      return;
    }

    if (!user) {
      toast.error("This user does not exist!");
      navigate('/register')
    } else if (user.password !== password) {
      toast.error("Incorrect password!");
    } else {
      setLoggedInUser(user);
      navigate("/dashboard");
    }
  
    console.log("Users:", users);
  };
  

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
    
            <form onSubmit={handleLogin}>
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
              <div className="flex items-center justify-center mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium tracking-wide text-white bg-blue-900 hover:bg-blue-800 rounded-lg"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
    
          <div className="flex items-center justify-center py-4 text-center ">
            <span className="text-sm text-black">
              Don't have an account?
            </span>
            <Link to={"/register"} className="mx-2 text-sm font-bold text-blue-900 hover:underline">
              Sign up here!
            </Link>
          </div>
        </div>
      </div>
    );
}

export default Login