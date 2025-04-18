import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'

function Home() {
  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(true)
  const userData = useSelector(state => state.auth.status)
  
  useEffect(() => {
    service.getPosts([]).then(posts => {
      if(posts){
        setPosts(posts.documents)
      }
    }).finally(() => setLoading(false)
    )
  },[userData])

  
  if(userData === false){
    return !loading ? (
      <div className='w-full py-8'>
        <Container>
          <div className='flex flex-wrap'>
            <h1>Login to read posts</h1>
          </div>
        </Container>
      </div>
    ) : null
  } 
  
  return !loading ? (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map(post => {
            const parsedFeaturedImage = JSON.parse(post.featuredImage)
            const imageUrl = parsedFeaturedImage.url
            
            return (
              <div className='p-2 w-1/4' key={post.$id}>
                <PostCard {...post} featuredImage={imageUrl}/>  
              </div>
            )
          }
          )}
        </div>
      </Container>
    </div>
  ) : null
  
}

export default Home