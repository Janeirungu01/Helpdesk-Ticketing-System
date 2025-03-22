import React from 'react'

function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full px-4 py-2 border rounded-lg focus:ring text-gray-500"
              />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-blue-500 text-sm hover:underline">Forgot Password?</a>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          
          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
      )
}

export default Login