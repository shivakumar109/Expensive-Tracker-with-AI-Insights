import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../Services/axiosInstance';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Check login status on refresh
  useEffect(() => {

    const storedUser = localStorage.getItem('user');

    const token = localStorage.getItem('token');

    const expiryTime = localStorage.getItem('expiryTime');

    // check if session still valid
    if (
      storedUser &&
      token &&
      expiryTime &&
      Date.now() < Number(expiryTime)
    ) {

      setUser(JSON.parse(storedUser));

    }
    else {

      // remove expired session
      localStorage.removeItem('token');

      localStorage.removeItem('user');

      localStorage.removeItem('expiryTime');
    }

    setLoading(false);

  }, []);

  // Login
  const login = async (credentials) => {

    try {

      const res = await axiosInstance.post(
        '/user-api/login',
        credentials
      );

      const { token, user } = res.data.payload || {};

      // fallback
      const actualToken =
        token ||
        res.data.token ||
        res.headers['x-auth-token'];

      const actualUser =
        user ||
        res.data.payload;

      // 3 hour expiry
      const expiryTime =
        Date.now() + 3 * 60 * 60 * 1000;

      // store data
      localStorage.setItem('token', actualToken);

      localStorage.setItem(
        'user',
        JSON.stringify(actualUser)
      );

      localStorage.setItem(
        'expiryTime',
        expiryTime
      );

      setUser(actualUser);

      toast.success('Logged in successfully!');

      return true;

    }
    catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Login failed'
      );

      return false;
    }
  };

  // Register
  const register = async (userData) => {

    try {

      await axiosInstance.post(
        '/user-api/users',
        userData
      );

      toast.success(
        'Registration successful! Please login.'
      );

      return true;

    }
    catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Registration failed'
      );

      return false;
    }
  };

  // Logout
  const logout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    localStorage.removeItem('expiryTime');

    setUser(null);

    toast.success('Logged out successfully!');
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};

export default AuthProvider;