import React from 'react'
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from '../container/Container'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'

function Header() {
  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    {name: 'Home',
     slug: '/',
     active: true
    },
    {name: 'Login',
     slug: '/login',
     active: !authStatus
     },
    {name: 'SignUp',
     slug: '/signup',
     active: !authStatus
    },
    {name: 'All Posts',
     slug: '/all-posts',
     active: authStatus
    },
    {name: 'Add Posts',
     slug: '/add-post',
     active: authStatus
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map(item => 
                item.active ? (                
                  <li key={item.name}>
                    <button className={`inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${location.pathname === item.slug ? 'text-red-200' : ''}`}
                            onClick={() => {
                      navigate(item.slug)
                    }}>
                      {item.name}
                    </button>
                  </li>
                ) : null
              )
            }
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header