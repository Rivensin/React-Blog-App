import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service{
  client = new Client()
  databases;
  bucket;

  constructor(){
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({title,slug,content,featuredImage,status,userId}){
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {title,content,featuredImage,status,userId}
      )
    } catch (error) {
      console.log('Appwrite Service :: createPost() :: error', error)
    }
  } 

  async updatePost(slug,{title,content,featuredImage,status}){
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {title,content,featuredImage,status}
      )
    } catch (error) {
      console.log('Appwrite Service :: updatePost() :: error', error)
    }
  }

  async deletePost(slug){
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      console.log('Appwrite Service :: deletePost() :: error', error)
      return false
    }
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log('Appwrite Service :: getPost() :: error', error)
      return false
    }
  }

  async getPosts(queries = [Query.equal('status','active')]){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log('Appwrite Service :: getPosts() :: error', error)
      return false
    }
  }

  //Storage Service

  async uploadImageToCloudinary(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", conf.cloudinaryUploadPreset);
  
    const res = await fetch(`${conf.cloudinaryURL}/${conf.cloudinaryName}/image/upload`, {
      method: "POST",
      body: data,
    });
  
    const json = await res.json();
    return {
      url: json.secure_url,
      publicId: json.public_id,
    }
  }

  getImageUrl(imageData) {
    if (!imageData) return null;
  
    // If imageData is an object and has 'secure_url'
    if (imageData.secure_url) {
      return imageData.secure_url;
    }
  
    // If imageData is a direct URL string
    return imageData;
  }

  async deleteImageFromCloudinary(publicId) {
    // Extract the actual public ID (the part after '/')
    const actualPublicId = publicId.split('/').pop();
  
    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `public_id=${actualPublicId}&timestamp=${timestamp}${conf.cloudinaryAPISecret}`;
    const sha1 = await this.generateSHA1(stringToSign);
  
    console.log("stringToSign:", stringToSign);
    console.log("sha1:", sha1);
  
    const data = new FormData();
    data.append("public_id", actualPublicId);
    data.append("timestamp", timestamp);
    data.append("api_key", conf.cloudinaryAPIKey);
    data.append("signature", sha1);
  
    const requestUrl = `${conf.cloudinaryURL}/${conf.cloudinaryName}/image/destroy`;
    console.log("Request URL:", requestUrl);
  
    try {
      const res = await fetch(requestUrl, {
        method: "POST",
        body: data,
      });
  
      const json = await res.json();
      console.log("Full Cloudinary Response:", json);
  
      if (json.result === "ok") {
        console.log("Image deleted successfully!");
      } else {
        console.error("Cloudinary delete failed:", json);
      }
    } catch (err) {
      console.error("Failed to delete image due to error:", err);
    }
  }
  
  async generateSHA1(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const buffer = await crypto.subtle.digest("SHA-1", data);
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  getPublicIdFromUrl(url) {
    try {
      const parts = url.split('/');
      const fileWithExtension = parts.slice(-1)[0]; // "filename.jpg"
      const fileName = fileWithExtension.split('.')[0]; // "filename"
      const folder = parts.slice(-2)[0]; // "folder"
      return `${folder}/${fileName}`; // "folder/filename"
    } catch (error) {
      console.error('Error extracting publicId:', error);
      return '';
    }
  }

  // async uploadFile(file){
  //   try {
  //     return await this.bucket.createFile(
  //       conf.appwriteBucketId,
  //       ID.unique(),
  //       file
  //     )
  //   } catch (error) {
  //     console.log('Appwrite Service :: uploadFile() :: error', error)
  //     return false
  //   }
  // }

  // async deleteFile(fileId){
  //   try {
  //     return await this.bucket.deleteFile(
  //       conf.appwriteBucketId,
  //       fileId
  //     )
  //   } catch (error) {
  //     console.log('Appwrite Service :: deleteFile() :: error', error)
  //     return false
  //   }
  // }

  // getFilePreview(fileId){
  //   return this.bucket.getFilePreview(
  //     conf.appwriteBucketId,
  //     fileId
  //   )
  // }
}

const service = new Service()

export default service