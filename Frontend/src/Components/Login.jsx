import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

  const { login, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {

    if(user){

      navigate('/dashboard');

    }

  }, [user]);

  // Handle input change
  const handleChange = (e) => {

    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });

  };

  // Handle login
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const success = await login(credentials);

    if (success) {

      navigate('/dashboard');

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">

      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">

        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Welcome Back
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="you@example.com"
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex justify-center items-center"
          >

            {loading
              ? <span className="animate-pulse">Signing in...</span>
              : 'Sign In'
            }

          </button>

        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-slate-400 text-sm">

          Don't have an account?{' '}

          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Sign up here
          </Link>

        </p>

      </div>

    </div>

  );
};

export default Login;