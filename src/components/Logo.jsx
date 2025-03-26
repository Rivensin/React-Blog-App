import React from 'react'

function Logo({width='w-full'}) {
  return (
    <img src='./images/logo.png' className={width} alt='logo-placeholder'/>
  )
}

export default Logo