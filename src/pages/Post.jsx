import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import Button from '../components/Button'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
  
  const [post,setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData) 
  
  const isAuthor = post && userData ? post.userId === userData.$id : false

  const deletePost = () => {
    service.deletePost(post.$id).then(status => {
      if(status){
        service.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  useEffect(() => {
    if(slug){
      service.getPost(slug).then(post => { 
        if(post){
          setPost(post)
        } else {
          navigate('/')
        }
      })
    }
  },[slug,navigate])
  
  return post ? (
    <div className='py-8'>
      <Container>
        <div className='w-full flex justify-center mb-4 border rounded-xl p-2 shadow-lg shadow-gray-500'>
          <div className='rounded-xl overflow-hidden'>
          <img src={service.getFilePreview(post.featuredImage)} 
               alt={post.title} 
          />
          </div>
          {isAuthor && (
            <div className="ml-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor='bg-green-500'
                        className='mb-4 shadow-lg shadow-gray-500'>
                  <img src="./images/logo.png" alt="edit" />
                  Edit
                </Button>
              </Link>
              <Button bgColor='bg-red-500' 
                      onClick={deletePost}
                      className='mb-2 shadow-lg shadow-gray-500'>
                <img src="./images/delete.svg" alt="delete" />
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className='w-full py-5 rounded-xl shadow-lg shadow-gray-500'>
          <h1 className='text-2xl font-bold border-b-2 border-gray-300'>
            {post.title}
          </h1>
          <div className='browser-css'>
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post