import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center ">
        <div className='text-center'>
            <h1 className="font-bold text-[1.3rem] lg:text-[1.5rem]">404 - Page Not Found</h1>
            <p className="font-light text-[0.9rem] lg:text-[1.1rem] text-neutral-500 mt-2">Something went wrong.</p>
        </div>
    </div>
      
  )
}

export default NotFoundPage