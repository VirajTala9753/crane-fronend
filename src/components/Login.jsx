import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { IconButton, InputAdornment, TextField, ToggleButton } from '@mui/material'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
// import { FcGoogle } from 'react-icons/fc'
import { loginCrane } from '../features/user/authUserSlice'
import axios from './api/message'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { email, password } = user
  let name, value
  const handleInput = (e) => {
    name = e.target.name
    value = e.target.value

    setUser({ ...user, [name]: value })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const loginToCrane = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)

      // console.log(user)
      const response = await axios.post('/login', user)
      setError()

      const loggedUser = response.data.user
      // console.log('🚀 ~ loginToCrane ~ loggedUser', loggedUser)

      localStorage.setItem('loginDone', true)
      navigate('/home')
      dispatch(loginCrane(loggedUser))
      toast.success('Welcome to Crane')
    } catch (error) {
      // console.log(error)
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="login d-flex flex-column">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo"></img>
      <h2 className="m-0 text-center">We are The Crane Team</h2>

      <form action="" onSubmit={loginToCrane}>
        <h3>Please login to your account</h3>
        <p className="error-handle-paragraph">{error}</p>
        <TextField
          id="outlined-username"
          className="outlined-textarea"
          // label="Email"
          type="text"
          placeholder="Enter Email or Username"
          name="email"
          value={email}
          onChange={handleInput}
          required
        />
        <TextField
          id="outlined-adornment-password"
          className="outlined-adornment-password"
          // label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={handleInput}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {password.length ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    className="border"
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                ) : null}
              </InputAdornment>
            ),
          }}
        />
        <NavLink className="forgot-password cursor-pointer" to="/accounts/password/reset">
          Forgot Password?
        </NavLink>
        <ToggleButton
          value="Sign In"
          className="sign-button"
          sx={{ width: '55%', margin: 'auto', height: 40 }}
          aria-label="list"
          type="submit"
          disabled={email.length && password.length >= 8 && !loading ? false : true}
        >
          {loading ? 'please wait...' : 'Sign In'}
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
          }}
          aria-label="list"
          type="button"
        >
          <FcGoogle className="mr-2" size={18} /> Continue with Google
        </ToggleButton> */}

        <div className="flex-center pt-4 ">
          <p className="mr-2">Don't have an account?</p>
          <NavLink className="create-new-btn" to="/accounts/emailSignup">
            Create new
          </NavLink>
        </div>
      </form>
    </div>
  )
}

export default Login
