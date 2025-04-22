import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

export default function Protected({children,authentication = true}) {

  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()
  const [loader,setLoader] = useState(true)

  useEffect(() => {
    if (authStatus === undefined) return

    if(authentication && !authStatus){
      navigate('/login')
    } else if(!authentication && authStatus){
      navigate('/')
    }
    setLoader(false)
  }
  ,[authStatus,authentication,navigate])

  return loader ? <Spinner /> : <> {children} </>
}