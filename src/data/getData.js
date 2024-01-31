import { useEffect, useContext, useState } from "react";
import axios from "axios"; // Đảm bảo bạn import thư viện axios

const getDataUser = () => {
  return axios.get(`http://localhost:3001/`)
}
const pustDataPost = (content,image) => {
  return axios.post(`http://localhost:3001/`,{
    content,
    image
  })
}
const getDataPost = () => {
  return axios.get('http://localhost:3001/get-data-post')
}
const pushComment = (dataComment,postID) =>{
  return axios.post(`http://localhost:3001/push-data-comment`,{
    postID,
    comment : dataComment
  })
}
const getComment = () =>{
  return axios.get(`http://localhost:3001/get-data-comment`)
}
const getReactions = () =>{
  return axios.get(`http://localhost:3001/get-data-reactions`)
}
const pushReactions = () =>{
  return axios.get(`http://localhost:3001/push-data-reactions`)
}
export{
  getDataUser,
  pustDataPost,
  getDataPost,
  pushComment,
  getComment,
  getReactions,
  pushReactions
} 

