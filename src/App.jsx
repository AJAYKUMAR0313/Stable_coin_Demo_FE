import React from 'react'
import LoginPage from './features/auth/pages/LoginPage'
import SignUpPage from './features/auth/pages/SignUpPage'
import { Routes, Route, Navigate } from 'react-router-dom'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App
