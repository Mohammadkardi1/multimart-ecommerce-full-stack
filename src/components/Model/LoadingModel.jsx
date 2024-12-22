import React from 'react'
import { CircularProgress } from '@mui/material'


const LoadingModel = ({color= "#2196f3", isFixed= false, size, styles}) => {

  return (  
    <div className={`${isFixed ? "fixed inset-0 z-20 " : ""} flex items-center justify-center ${styles}`}>
          <CircularProgress style={{ color: color }} size={size}/>
    </div>
  )
}

export default LoadingModel