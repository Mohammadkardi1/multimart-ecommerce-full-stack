import React from 'react'


const ErrorModel = ({errorMsg, styles}) => {
  return ( 
    <div className={`${styles} flex flex-col gap-2 justify-center items-center `}>
        <div className='text-center'>
            <p className="font-light text-[0.9rem] lg:text-[1.1rem] text-neutral-800 mt-2">{errorMsg}</p>
        </div>
    </div>
  )
}

export default ErrorModel