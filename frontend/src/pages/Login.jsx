import React from "react";
import { Link } from 'react-router-dom'
export default function Login () {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="flex w-full max-w-6xl items-center justify-center gap-10 p-6">
                {/* Left Section - Images */}
                <div className="hidden md:flex relative w-1/2 items-center justify-center">


                    <div className="relative  bg-white rounded-2xl  overflow-hidden z-10">
                        <img
                            src="/public/images/main-image.png"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Section - Login Box */}
                <div className="w-full max-w-sm flex flex-col items-center text-center">
                    <h1 className="text-5xl font-bold mb-8 font-serif">Instagram</h1>

                    <div className="w-full bg-white p-8 border border-gray-300 rounded-xl shadow-sm">
                        <input
                            type="text"
                            placeholder="Phone number, profile name or email"
                            className="w-full p-3 mb-3 border rounded-md text-sm focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 mb-4 border rounded-md text-sm focus:outline-none"
                        />

                        <button className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600">
                            Log in
                        </button>

                        <div className="flex items-center my-4 w-full">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="mx-3 text-gray-500 text-sm">OR</span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>

                        <button className="flex items-center justify-center gap-2 text-blue-600 font-medium w-full">
                            <i className="fab fa-facebook"></i> Log in with Facebook
                        </button>

                        <p className="text-sm text-blue-600 mt-4 cursor-pointer">Forgot your password?</p>
                    </div>

                    <div className="w-full border border-gray-300 rounded-xl p-4 mt-4 text-sm">
                        Don't have an account? <Link to='/register' className="text-blue-600 font-semibold cursor-pointer">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
