import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from './pages/LoginPage'
import MainLayout from './pages/MainLayout'
import SignUpPage from './pages/SignUpPage'
import PrivateRoute from './helper/PrivateRoute'
import PublicRoute from './helper/PublicRoute'
import ForgotPassword from './components/ForgotPassword'

function App() {
  const withPrivacy = (component) => {
    return <PrivateRoute component={component} />
  }

  const withoutPrivacy = (component) => {
    return <PublicRoute component={component} />
  }

  return (
    <div className = "main_container" data-theme="light" >
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-right" autoClose={2000} closeOnClick />
      <Routes>
        <Route path="/accounts/password/reset" element={withoutPrivacy(ForgotPassword)} />
        <Route path="/accounts/login" element={withoutPrivacy(LoginPage)} />
        <Route path="/accounts/emailSignup" element={withoutPrivacy(SignUpPage)} />
        <Route path="/home" element={withPrivacy(MainLayout)} />
        <Route path="*" element={withPrivacy(MainLayout)} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
