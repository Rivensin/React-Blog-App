import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'

function Home() {
  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    service.getPosts([]).then(posts => {
      if(posts){
        setPosts(posts.documents)
      }
    }).finally(() => setLoading(false))
  },[])

  if(posts.length === 0){
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
          {posts.map(post => (
            <div className='p-2 w-1/4' key={post.$id}>
              <PostCard {...post}/>  
            </div>
          )
          )}
        </div>
      </Container>
    </div>
  ) : null
  
}

  

export default Home