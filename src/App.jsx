import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const userData = useSelector(state => state.auth)
 
  useEffect(() => {
    authService.getCurrentUser().then(userData => {
      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    }).finally(() => setLoading(false))
  },[dispatch])

  return !loading ? (
    <div className='min-h-screen h-full flex flex-col bg-gray-400'>
      <div className='w-full'>
        <Header />
        <main className='flex-grow'>
          <Outlet />  
        </main>
      </div>
      <div className='w-full'>
        <Footer />  
      </div>            
    </div>
  ) : null

}

export default App
