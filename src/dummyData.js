import axios from "axios";
import { useState } from "react";
import { getDataPost , getComment,pushComment,getReactions,pushReactions} from "./data/getData"
import moment from "moment";
export const Users = [
    {
        id: 1, 
        profilePicture: 'assets/person/2.jpg',
        username: 'Pham Hai Minh',
    },
    {
        id: 2, 
        profilePicture: 'assets/person/3.jpg',
        username: 'Do Duy Khanh',
    },
    {
        id: 3, 
        profilePicture: 'assets/person/4.jpg',
        username: 'Trinh Quang Duy',
    },
    {
        id: 4, 
        profilePicture: 'assets/person/5.jpg',
        username: 'Hoang Ba Tu',
    },
    {
        id: 5, 
        profilePicture: 'assets/person/6.jpg',
        username: 'Pham Hai Minh',
    }
];



export const handleDataPost = async ()=>{
    const res = await getDataPost()
    const posts = res.data.data
    const postsDb = []
    for(let i = 0 ; i < posts.length ; i++ ) {
        const newPost = {
            post_id : posts[i].post_id,
            desc: posts[i].content,
            photo: posts[i].image_url,
            date: date(posts[i].created_at,res.data.currentDate),
            userId: posts[i].user_id,
            like: 367,
        }
        postsDb.push(newPost)
        let check = false
        for(let j = 0 ; j <Users.length ; j++){
            if(Users[j].id === posts[i].user_id){
                check = true;
                break
            }
            
        }
        if(!check){
            Users.push({
                id : posts[i].user_id,
                profilePicture: 'assets/person/6.jpg',
                username: 'Pham Hai Minh'
            })
        }
        // không dùng hàm icludes nó không kiểm tra được thuộc tính của đối tượng 
    }
    return postsDb
    // thay đổi mảng cũ thành mảng mới thì mới nên dùng map,reduce,filter
    //map là thay đổi tất cả giá trị trong mảng hoặc thao tác với mảng
    //filter là lọc mảng
    // reduce là dùng để tính tổng mảng hoặc gộp các phần tử 
}
export const newDataPosts = async() =>{
    console.log(1)
    const res = await getDataPost()
    const posts = res.data.data
    const length = posts.length-1
    const newPost = {
        post_id : posts[length].post_id,
        id: posts[length].user_id,
        desc: posts[length].content,
        photo: posts[length].image_url,
        date: date(posts[length].created_at,res.data.currentDate),
        userId: 5,
        like: 367,
        comment: 39,
    }
    return newPost
}
export const handleCommentPost = async() =>{
    const res = await getComment()
    const comments = res.data.data
    
    return comments
}
export const handlePushComment = async(dataComment,postID) =>{
    const res = await pushComment(dataComment,postID)
    console.log(res.data.data)
    return res.data.data
}
export const handleCommentNew = async() =>{
    const res = await getComment()
    const comments = res.data.data
    const length = comments.length-1
    return comments[length]
}
export const handleReactions = async() =>{
    const res = await getReactions()
    console.log(res.data.data)
    return res.data.data
}
export const handlePushReactions = async ()=>{
    const res = await pushReactions()
    console.log(res.data.data)
}
function date(start1, end1) {
    const start = new Date(start1);
const end = new Date(end1);

// Tính khoảng thời gian trong mili giây
const timeDifferenceInMilliseconds = end - start;

// Chuyển đổi khoảng thời gian từ mili giây sang giây
const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);

let time = '';

if (seconds < 60) {
    time = seconds + ' seconds ago'
} else if (seconds < 3600) {  // từ 1 phút đến 1 giờ
    time = Math.floor(seconds / 60) +  ' minutes ago'
} else if (seconds < 86400) {  // từ 1 giờ đến 1 ngày
    time = Math.floor(seconds / 3600) + ' hours ago'
} else {
    time = Math.floor(seconds / 86400) + ' day ago'
}
return `${time}`
}