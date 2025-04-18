import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'

function PostCard({$id,title,featuredImage}) 
{
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full h-full bg-gray-100 rounded-xl p-4 hover:opacity-80 transition duration-200 hover:bg-cyan-200'>
        <div>
          <img src={service.getImageUrl(featuredImage)} alt={title}
               className='rounded-xl w-full h-48 object-cover' />
        </div>
        <div className='text-xl font-bold'>{title}</div>
      </div>
    </Link>
  )
}

export default PostCard