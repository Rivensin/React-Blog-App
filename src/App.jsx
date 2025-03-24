import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import reactLogo from './assets/react.svg'

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
    <div className='h-full flex flex-col'>
      <div className='w-full'>
        <Header />
      </div>
        <main className='flex-grow bg-[#8d99ae]'>
          <Outlet />  
        </main>
      <div className='w-full'>
        <Footer />  
      </div>            
    </div>
  ) : null

}

export default App
