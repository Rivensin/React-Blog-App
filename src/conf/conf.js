const conf = {
  appwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  cloudinaryURL : String(import.meta.env.VITE_CLOUDINARY_URL),
  cloudinaryName: String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME),
  cloudinaryUploadPreset: String(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET),
  cloudinaryAPIKey: String(import.meta.env.VITE_CLOUDINARY_API_KEY),
  cloudinaryAPISecret: String(import.meta.env.VITE_CLOUDINARY_API_SECRET)
}

export default conf