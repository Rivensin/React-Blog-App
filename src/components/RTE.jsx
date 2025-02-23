import React from 'react'
import {Controller} from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'

function RTE({
  label,name,control,defaultValue = ''
}) {
  return (
    <div className='w-full'>
      {label && 
        <label className='inline-block mb-1 pl-1'>
          {label}
        </label>
      }
      <Controller 
        name = {name ||'content'}
        control = {control}
        render = {({field: {onChange}}) => (
          <Editor 
            initialValue={defaultValue}
            apiKey='a4x4lsc3l86z2o9rvg8al9w8zo49ek00faype2ial6kcf1en'
            init={
              {
                branding: false,
                height: 500,
                menubar: true,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor','searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table','code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' + 'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }
            }
            onEditorChange={onChange}  
          />
        )}
      />
    </div>
  )
}

export default RTE