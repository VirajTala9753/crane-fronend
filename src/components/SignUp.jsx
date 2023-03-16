import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { InputAdornment, TextField, ToggleButton } from '@mui/material'
import InputEndAdornment from './utils/InputEndAdornment'
// import { FcGoogle } from 'react-icons/fc'
import { MdOutlineEmail } from 'react-icons/md'
import { FiUserCheck } from 'react-icons/fi'
import { BiLock } from 'react-icons/bi'

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [message, setMessage] = useState({})
  const [loading, setLoading] = useState(false)
  const [isValidate, setIsValidate] = useState({})

  const userName = user.name
  const { email, password, passwordConfirm } = user

  const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

  let name, value
  const handleInput = (e) => {
    name = e.target.name
    value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const signUpToCrane = async (e) => {
    e.preventDefault()
    setMessage({})
    setLoading(true)
    const { name, email, password, passwordConfirm } = user

    if (!password === passwordConfirm) {
      setLoading(false)
      return setMessage({
        ...message,
        passwordConfirmationError: 'your password not matched! try again.',
      })
    }

    const data = await fetch('http://localhost:5000/api/v1/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    })
    const response = await data.json()

    if (response.error) {
      setMessage({ ...message, emailError: response.message })
    } else {
      setMessage({
        ...message,
        success: 'Activation link has been sent to your mail account , please activate your CRANE account',
      })
      setUser({ name: '', email: '', password: '', passwordConfirm: '' })
    }
    setLoading(false)
  }

  return (
    <div className="sign-up d-flex flex-column">
      <form action="" onSubmit={signUpToCrane}>
        <h2>Get started with free account</h2>
        <p className={`error-handle-paragraph ${message.success ? 'success-message' : ''}`}>
          {message.emailError}
          {message.passwordConfirmationError}
          {message.success}
        </p>
        <TextField
          id="sign-username"
          className="outlined-textarea"
          label="Username"
          type="text"
          name="name"
          value={userName}
          onChange={(e) => {
            handleInput(e)
            e.target.value.length >= 5
              ? setIsValidate({ ...isValidate, name: true })
              : setIsValidate({ ...isValidate, name: false })
          }}
          placeholder="Username"
          required
          // autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiUserCheck size={22} />
              </InputAdornment>
            ),
            endAdornment: userName ? <InputEndAdornment isValidate={isValidate?.name} userName={userName} /> : null,
          }}
        />
        <TextField
          id="sign-email"
          className="outlined-textarea"
          label="Email"
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => {
            handleInput(e)
            isEmail(e.target.value)
              ? setIsValidate({ ...isValidate, email: true })
              : setIsValidate({ ...isValidate, email: false })
          }}
          required
          // autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineEmail size={22} />
              </InputAdornment>
            ),
            endAdornment: email ? <InputEndAdornment isValidate={isValidate?.email} /> : null,
          }}
        />
        <TextField
          id="sign-password"
          className="outlined-textarea"
          label="Password"
          type="password"
          placeholder="Your Password"
          name="password"
          value={password}
          onChange={handleInput}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiLock size={22} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="sign-confirm-password"
          className="outlined-textarea"
          label="confirm Password"
          type="password"
          placeholder="Enter Password Again"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => {
            handleInput(e)
            password === e.target.value
              ? setIsValidate({ ...isValidate, password: true })
              : setIsValidate({ ...isValidate, password: false })
          }}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiLock size={22} />
              </InputAdornment>
            ),
            endAdornment: passwordConfirm ? <InputEndAdornment isValidate={isValidate?.password} /> : null,
          }}
        />
        <ToggleButton
          value="Sign In"
          className="sign-button"
          sx={{ width: '55%', margin: 'auto', height: 40 }}
          aria-label="list"
          type="submit"
          disabled={
            userName?.length && email?.length && password?.length >= 8 && passwordConfirm?.length >= 8 && !loading
              ? false
              : true
          }
        >
          {loading ? 'please wait...' : 'Sign Up'}
        </ToggleButton>
        {/* <div className="divider d-flex align-items-center ">
          <p className="text-center fw-bold mx-3  text-muted">OR</p>
        </div> */}
        {/* 
        <ToggleButton
          value="Sign In"
          className="google-button"
          sx={{
            width: '100%',
            margin: 'auto',
            height: 40,
            backgroundColor: 'white',
            padding: 0,
          }}
          aria-label="list"
          type="button"
        >
          <FcGoogle className="mr-2" size={18} /> Continue with Google
        </ToggleButton> */}

        <div className="flex-center pt-4 ">
          <p className="mr-2">Have already an account?</p>
          <NavLink className="login-here-btn text-decoration-underline cursor-pointer fw-bold" to="/accounts/login">
            Login Here
          </NavLink>
        </div>
      </form>
    </div>
  )
}

export default SignUp
