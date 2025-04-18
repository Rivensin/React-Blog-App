import { AppwriteException } from 'appwrite'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
import { useSelector } from 'react-redux'


function EditPost() {
  const [post,setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)
  //
  useEffect(() => {
    if(slug){
      service.getPost(slug).then(post => {      
        if(post && userData.$id === post.userId){
          const parsedFeaturedImage = JSON.parse(post.featuredImage)
          post.featuredImage = parsedFeaturedImage.url
          setPost(post)
        } else {
          navigate('/')
        } 
      })
    } else {
      navigate('/')
    }
  },[slug,navigate])
  
  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post}></PostForm>
      </Container>
    </div>
  )
}

export default EditPost