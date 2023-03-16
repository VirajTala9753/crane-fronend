import { Navigate } from 'react-router-dom'
import React from 'react'

const PrivateRoute = ({ component: Component }) => {
  const isLogged = localStorage.getItem('loginDone')
  return isLogged ? <Component /> : <Navigate to="/accounts/login" />
}
export default PrivateRoute
