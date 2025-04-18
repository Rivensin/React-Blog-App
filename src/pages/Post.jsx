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
          const parsedFeaturedImage = JSON.parse(post.featuredImage)
          post.featuredImage = parsedFeaturedImage.url
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
        <div className='w-full mb-4 border rounded-xl p-2 shadow-lg shadow-gray-500'>
          <div className='rounded-xl overflow-hidden'>
          <img src={post.featuredImage} 
               alt={post.title} 
               className='w-full h-[640px]'
          />
          </div>
          {isAuthor && (
            <div className="my-2 flex">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor='bg-green-500'
                        className='hover:shadow-lg hover:shadow-gray-500 hover:opacity-80 h-15 mr-5'>
                  <img src={`${import.meta.env.BASE_URL}images/edit.svg`} alt="edit" />
                  Edit
                </Button>
              </Link>
              <Button bgColor='bg-red-500' 
                      onClick={deletePost}
                      className='hover:shadow-lg hover:shadow-gray-500 hover:opacity-80 h-15'>
                <img src={`${import.meta.env.BASE_URL}images/delete.svg`} alt="delete" />
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