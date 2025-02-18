import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Profile() {
  const [users, setUsers] = useLocalStorage('users', []);
  const [loggedInUser, setLoggedInUser] = useLocalStorage('user', {});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect to login if no user is logged in
  useEffect(() => {
    if (!loggedInUser?.username) {
      navigate('/login');
    }
  }, [loggedInUser, navigate]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const data = e.target.elements;
    const currentPassword = data['currentPassword'].value;
    const newUsername = data['newUsername'].value;
    const newPassword = data['newPassword'].value;

    // Check if the current password matches the logged-in user's password
    if (currentPassword !== loggedInUser.password) {
      toast.error('Incorrect current password');
      return;
    }

    // Clear any previous error messages
    setError('');

    // Update the user's data
    const updatedUsers = users.map(user =>
      user.username === loggedInUser.username
        ? { ...user, username: newUsername, password: newPassword }
        : user
    );

    // Update the users list and the logged-in user
    setUsers(updatedUsers);
    setLoggedInUser({ username: newUsername, password: newPassword });

    // Show success message and reset the form
    toast.success('Your profile was updated successfully');
    e.target.reset();
  };

  return (
    <section className="max-w-4xl p-6 mx-auto my-12 bg-slate-200 rounded-md shadow-md">
      <h2 className="text-lg font-semibold capitalize text-gray-700">
        Update your profile
      </h2>

      {/* Display error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleUpdateProfile}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          {/* Current Password Field */}
          <div>
            <label className="text-gray-700" htmlFor="currentPassword">
              Current Password:
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              className="block w-full px-4 py-2 mt-2 bg- text-gray-700 rounded-md focus:ring-gray-700 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          {/* New Username Field */}
          <div>
            <label className="text-gray-700" htmlFor="newUsername">
              New Username:
            </label>
            <input
              id="newUsername"
              name="newUsername"
              type="text"
              defaultValue={loggedInUser.username || ''}
              required
              className="block w-full px-4 py-2 mt-2 bg- text-gray-700 rounded-md focus:ring-gray-700 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          {/* New Password Field */}
          <div>
            <label className="text-gray-700" htmlFor="newPassword">
              New Password:
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              className="block w-full px-4 py-2 mt-2 bg- text-gray-700 rounded-md focus:ring-gray-700 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;