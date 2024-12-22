import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthorizationProtect = ({children, allowedRoles}) => {

    const loggedInUser = JSON.parse(localStorage.getItem('profile'))
    const isAllowed = allowedRoles.includes(loggedInUser?.role)

  return isAllowed ? children : <Navigate to='/login' replace={true}/>
  
}

export default AuthorizationProtect