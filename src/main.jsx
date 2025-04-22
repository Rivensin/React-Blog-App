import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import store from './store/store.js'
import Protected from './components/AuthLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import { lazy,Suspense } from 'react'

const home = lazy(() => import('./pages/Home.jsx'));
const login = lazy(() => import('./pages/Login.jsx'));
const signUp = lazy(() => import('./pages/SignUp.jsx'));
const allPost = lazy(() => import('./pages/AllPost.jsx'));
const addPost = lazy(() => import('./pages/AddPost.jsx'));
const editPost = lazy(() => import('./pages/EditPost.jsx'));
const post = lazy(() => import('./pages/Post.jsx'));


const loadable = Component => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {path: "/", 
        element: loadable(home)
      },
      {path: "/login", 
       element: 
       <Protected authentication={false}>
        {loadable(login)}
       </Protected>
      },
      {path: "/signup", 
        element: 
        <Protected authentication={false}>
          {loadable(signUp)}
        </Protected>
       },
       {path: "/all-posts", 
        element: 
        <Protected authentication>
           {loadable(allPost)}
        </Protected>
       },
       {path: "/add-post", 
        element: 
        <Protected authentication>
           {loadable(addPost)}
        </Protected>
       },
       {path: "/edit-post/:slug",
        element: 
        <Protected authentication>
           {loadable(editPost)}
        </Protected>
       },
       {path: "/post/:slug", 
        element: 
        <Protected authentication>
           {loadable(post)}
        </Protected>
       }
    ],
    
  }
  ],
  { basename: "/React-Blog-App/" }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>  
  </StrictMode>
)
