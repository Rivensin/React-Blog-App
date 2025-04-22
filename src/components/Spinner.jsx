import React from 'react'

function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      <div className='my-10'>Loading...</div>
    </div>
  )
}

export default Spinner