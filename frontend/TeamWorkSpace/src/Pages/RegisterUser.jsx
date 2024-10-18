  import React, { useState } from 'react';
  import './CSS/RegisterUser.css';
  import { useNavigate } from 'react-router-dom';

  const RegisterUser = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [user, setUser] = useState({
      username: '',
      email: '',
      password: '',
      role: ''
    });
    const navigate = useNavigate(); // Updated to useNavigate

    const onChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUser = async (e) => {
      e.preventDefault();

      if (isRegistering) {
        // Register a new user
        let newUser;
        await fetch('http://localhost:4000/addUser', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
          .then((res) => res.json())
          .then((data) => (newUser = data));

        if (newUser.success) {
          alert("New User added");
          console.log(newUser);
          setUser({ username: '', email: '', password: '', role: '' }); // Reset the form
        }
      } else {
        // Login: Fetch all users and compare credentials
        const response = await fetch('http://localhost:4000/allUsers', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        });
        const allUsers = await response.json();

        // Find a user with matching username and password
        const matchingUser = allUsers.find(
          (u) => u.username === user.username && u.password === user.password
        );

        if (matchingUser) {
          alert(`Welcome, ${matchingUser.username}`);
          console.log(matchingUser);
          // Redirect to /Dashboard and pass the user role
          navigate('/Dashboard', { state: { role: matchingUser.role } });
        } else {
          alert("Invalid username or password");
        }
      }
    };

    // Toggle between registration and login
    const toggleForm = () => {
      setIsRegistering(!isRegistering);
      setUser({ username: '', email: '', password: '', role: '' }); // Reset form when toggling
    };

    return (
      <div className='User_Registration'>
        <form method='POST' onSubmit={handleUser}>
          <h2>{isRegistering ? 'Create Account' : 'Sign In'}</h2>

          <div className='form-group'>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              name='username'
              value={user.username}
              onChange={onChange}
              required
            />
          </div>

          {isRegistering && (
            <>
              <div className='form-group'>
                <label htmlFor='email'>Email:</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={user.email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>User Type:</label>
                <div className='radio_btn'>
                  <div>
                    <input
                      type='radio'
                      id='user'
                      name='role'
                      value='user'
                      checked={user.role === 'user'}
                      onChange={onChange}
                    />
                    <label htmlFor='user'>User</label>
                  </div>
                  <div>
                    <input
                      type='radio'
                      id='admin'
                      name='role'
                      value='admin'
                      checked={user.role === 'admin'}
                      onChange={onChange}
                    />
                    <label htmlFor='admin'>Admin</label>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={user.password}
              onChange={onChange}
              required
            />
          </div>

          <button type='submit'>{isRegistering ? 'Create Account' : 'Sign In'}</button>

          <p className='toggle-link'>
            {isRegistering ? 'Already have an account?' : 'Don’t have an account?'}
            <span onClick={toggleForm}>
              {isRegistering ? ' Sign In' : ' Create Account'}
            </span>
          </p>
        </form>
      </div>
    );
  };

  export default RegisterUser;
