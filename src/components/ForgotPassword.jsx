import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { HiOutlineLockClosed } from 'react-icons/hi'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({})

  const forgotPassword = async (e) => {
    e.preventDefault()
    setMessage({})
       setLoading(true)

    const data = await fetch('https://sparkling-crow-clothes.cyclic.app/api/v1/forgotPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
      }),
    })
    const response = await data.json()
    if (response.error) {
      setMessage({
        ...message,
        error: 'No User Found against this Email, Check your Email and Try again',
      })
    } else {
      setMessage({
        ...message,
        success: 'Forget password link successfully sent to your Email, Check and Update password',
      })
    }
    setLoading(false)
  }

  return (
    <div className="forgot-password-page flex-center">
      <div className="forgot-password-container d-flex flex-column">
        <HiOutlineLockClosed className="m-auto close-lock p-3" size={90} />
        <span className="text-center trouble-logging">Trouble logging in?</span>
        <p className="text-center mx-auto">Enter your email and we'll send you a link to get back into your account.</p>
        <form action="" className="d-flex flex-column">
          <p className={`error-handle-paragraph ${message.success ? 'success-message' : ''}`}>
            {message.error}
            {message.success}
          </p>
          <TextField
            id="outlined-basic"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            label="Email"
          />
          <Button type="submit" onClick={forgotPassword} disabled={email.length && !loading ? false : true}>
            {loading ? 'please wait...' : 'Send Login Link'}
          </Button>
          <div className="divider d-flex align-items-center ">
            <p className="text-center fw-bold mx-3 text-muted">OR</p>
          </div>
          <NavLink className="create-new m-auto" to="/accounts/emailSignup">
            Create New Account
          </NavLink>
          <NavLink className="back-to-login w-100 py-2" to="/accounts/login">
            Back To Login
          </NavLink>
        </form>
      </div>
    </div>
  )
}
export default ForgotPassword
