import React from 'react'
import './globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import 'react-loading-skeleton/dist/skeleton.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import ProfilePage from './pages/ProfilePage'
import Chatkhana from './pages/ChatKhana'
import VideoCallZego from './pages/VideoCall'
const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile-page/:user_id' element={<ProfilePage />} />
        <Route path='/messages' element={<Chatkhana />} />
        <Route path='/video-call/:caller_id/:receiver_id' element={<VideoCallZego />} />
      </Routes>
    </Router>
  )
}

export default App