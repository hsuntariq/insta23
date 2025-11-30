import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { regUser, userReset } from '../features/users/userSlice';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from 'react-loader-spinner';
const InstagramSignUp = () => {
    const [formFields, setFormFields] = useState( {
        m_mail: '', password: '', fullName: '', profileName: ''
    } )

    const { m_mail, password, fullName, profileName } = formFields

    const handleChange = ( e ) => {
        setFormFields( {
            ...formFields,
            [e.target.name]: e.target.value
        } )
    }

    const dispatch = useDispatch()


    const { user, userLoading, userError, userMessage, userSuccess } = useSelector( ( state ) => state.auth )

    const navigate = useNavigate()


    useEffect( () => {
        if ( userError ) {
            toast.error( userMessage )
        }

        if ( userSuccess ) {
            navigate( '/home' )
        }

        dispatch( userReset() )


    }, [userError, userSuccess] )






    const handleRegister = () => {
        const userData = {
            mobile: m_mail,
            password,
            fullName,
            username: profileName
        }

        dispatch( regUser( userData ) )


    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
            <div className="max-w-md w-full bg-white border border-gray-300 rounded-lg p-8">
                {/* Instagram Logo/Title */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold font-serif mb-2">Instagram</h1>
                    <p className="text-gray-600 text-sm font-medium">
                        Sign up to see photos and videos from your friends.
                    </p>
                </div>

                {/* Facebook Login Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded text-sm mb-4 transition duration-200 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Log in with Facebook
                </button>

                {/* Separator */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-xs font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Sign Up Form */}
                <form className="space-y-3">
                    <input
                        type="text"
                        name='m_mail'
                        value={m_mail}
                        onChange={handleChange}
                        placeholder="Mobile number or email"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 focus:outline-none focus:border-gray-400"
                    />
                    <input
                        type="password"
                        name='password'
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 focus:outline-none focus:border-gray-400"
                    />
                    <input
                        type="text"
                        name='fullName'
                        value={fullName}
                        onChange={handleChange}
                        placeholder="Full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 focus:outline-none focus:border-gray-400"
                    />
                    <input
                        type="text"
                        name='profileName'
                        value={profileName}
                        onChange={handleChange}
                        placeholder="Profile name"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 focus:outline-none focus:border-gray-400"
                    />
                </form>

                {/* Contact Information Notice */}
                <div className="my-4">
                    <p className="text-xs text-gray-500 text-center leading-4">
                        People who use our service may have imported your contact information to Instagram.{' '}
                        <a href="#" className="text-blue-900import { useDispatch } from 'react-redux';
 font-semibold">Learn more.</a>
                    </p>
                </div>

                {/* Terms and Conditions */}
                <div className="my-4">
                    <p className="text-xs text-gray-500 text-center leading-4">
                        By signing up, you agree to our{' '}
                        <a href="#" className="text-blue-900 font-semibold">Terms and Conditions</a>,{' '}
                        <a href="#" className="text-blue-900 font-semibold">Privacy Policy</a>, and{' '}
                        <a href="#" className="text-blue-900 font-semibold">Cookie Policy</a>.
                    </p>
                </div>

                {/* Register Button */}
                <button disabled={userLoading} onClick={handleRegister} className={`w-full flex justify-center ${userLoading ? 'bg-gray-500 ' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold py-1.5 px-4 rounded text-sm mt-2 transition duration-200`}>
                    {
                        userLoading ? <CircularProgress
                            height="25"
                            width="25"
                            color="white"
                            ariaLabel="circular-progress-loading"
                            wrapperStyle={{}}
                            wrapperClass="wrapper-class"
                            visible={true}
                            strokeWidth={2}
                            animationDuration={1}
                        />
                            :
                            'Register'
                    }
                </button>
            </div>

            {/* Login Link */}
            <div className="max-w-md w-full bg-white border border-gray-300 rounded-lg p-6 text-center mt-4">
                <p className="text-sm">
                    Do you have an account?{' '}
                    <Link to='/' className="text-blue-500 font-semibold">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default InstagramSignUp;