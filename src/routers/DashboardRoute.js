import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const DashboardRoute = () => {

    const { loggedInUser } = useSelector(state => state.auth)

    return loggedInUser ? <Outlet/> : <Navigate to='/login'  state={{path: '/dashboard'}}/> 
}

export default DashboardRoute