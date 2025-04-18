import React, {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import service from '../../appwrite/config'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'

export default function PostForm({post}) {
  const {register, handleSubmit, watch, control, setValue} = useForm()
  
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)
  
  const submit = async(data) => {
    if(post){
      const imageUrl = data.image[0] ? await service.uploadImageToCloudinary(data.image[0]) : null
      //memasukkan 'image' yang telah di register dalam component Input ke appwrite
      
      if(imageUrl){
        const publicId = service.getPublicIdFromUrl(post.featuredImage)
        if(publicId){
            await service.deleteImageFromCloudinary(publicId) //delete 'image' yang sudah ada di cloudinary
        }
      }
      
      const dbPost = await service.updatePost(post.$id, {...data, featuredImage : imageUrl ? JSON.stringify(imageUrl) : post.featuredImage}) //menambahkan featuredimage dengan mengambil variable file.$id 

      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const imageUrl = await service.uploadImageToCloudinary(data.image[0]) //memasukkan 'image' yang telah di register dalam component Input ke appwrite

      if(imageUrl){
        const dbPost = await service.createPost({...data,featuredImage: JSON.stringify(imageUrl),userId: userData.$id}) 
        
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback(value => {
    if(value && typeof value === 'string') 
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-')
  },[])

  React.useEffect(() => {
    if (post) {
      setValue('title', post.title || '');
      setValue('slug',slugTransform(post.title || ''),{shouldValidate : true} )
      setValue('content', post.content || '');
      setValue('status', post.status || 'active');
    }
  }, [post]);

  React.useEffect(() => {
    watch((value,{name}) => {
      if(name === 'title'){
        setValue('slug',slugTransform(value.title),{shouldValidate : true})
      }
    })
  },[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)}
          className='flex flex-wrap justify-center bg-gray-200 rounded-lg p-2 pb-4 shadow-lg'
    >
      <div className='w-2/3 px-2'>
        <Input label='Title'
               placeholder='Title'
               className='mb-4'
        {...register('title', {required: true})}
        />
        <Input label='Slug :'
               placeholder='Slug'
               className='mb-4'
        {...register('slug', {required: true})}
        onInput= {e => {setValue('slug',slugTransform(e.currentTarget.value),{shouldValidate: true})}}
        />
        <RTE label='content:'
             name='content'
             control={control}
             defaultValue={post ? post.content : ''}
        />
      </div>
      <div className='w-1/3 px-2'>
        <Input label = 'Featured Image'
               type = 'file'
               className = 'mb-4'
               accept = 'image/png, image/jpg, image/jpeg'
          {...register('image',{required : !post})}               
        />
        {post && (
          <div className='w-full mb-4'>
            <img src={post.featuredImage.secure_url || post.featuredImage} alt={post.title}
                 className='rounded-lg' 
            />
          </div>
        )}
        <Select options = {['active','inactive']}
                label = 'status'
                className = 'mb-4'
          {...register('status',{required : true})}
        />
        <Button type='submit'
                bgColor={post ? 'bg-green-500' : undefined}
                className='w-full hover:opacity-80 transition duration-200'
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
