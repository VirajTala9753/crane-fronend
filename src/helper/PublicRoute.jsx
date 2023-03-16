import { Navigate } from 'react-router-dom'
import React from 'react'

const PublicRoute = ({ component: Component }) => {
  const isLogged = localStorage.getItem('loginDone')
  return !isLogged ? <Component /> : <Navigate to="/" />
}
export default PublicRoute
