import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthenticationProtect = ({children}) => {
    const loggedInUser = JSON.parse(localStorage.getItem('profile'))

    return loggedInUser?.data  ? <Navigate to='/home' />  : children
}

export default AuthenticationProtect