import React from 'react'
import { MdOutlineClose } from "react-icons/md";


export const PopUpModel = ({isModelOpen, setIsModelOpen, message}) => {

  return (
    <>
    {isModelOpen && 
      <div className='fixed inset-0 flex items-center justify-center bg-black/[0.6] bg-opacity-60 z-20'>
        <div className='w-[500px] bg-white rounded-lg p-4 space-y-4'>
          <div className='flex justify-end mb-4'>
            <MdOutlineClose onClick={() => setIsModelOpen(!isModelOpen)} size={30}
                className='cursor-pointer text-black p-1'/>
          </div>
          <div className='text__para'>
            {message}
          </div>
          <div className='flex justify-end'>
            <button 
              className=' bg-red-600 mt-4 py-2 px-6 text-[16px] leading-7 rounded-sm text-white'
              onClick={() => setIsModelOpen(!isModelOpen)}>
              Close
            </button>
          </div>
        </div>
      </div>
      }
    </>
  )
}