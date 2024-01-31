import React, { useEffect, useState, useCallback } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import { handleDataPost, newDataPosts ,handleCommentPost,handleReactions } from '../../dummyData';
import Comment from '../comment/Comment'
// trước là import dữ liệu từ chỗ khác Posts và rồi lấy data base thêm vào nó không hiệu quả vì nó không cập nhật được => nên dùng state để nó cập nhật dữ liệu vào đây luôn
export default function Feed() {
  const [checkButtonShare, setCheckButtonShare] = useState(false);
  const [Posts,setPosts] = useState([]);
  const [Comments,setComments] = useState([]);
  const [Reactions, setReactions] = useState([]);
  useEffect(() => {
    //  handleDataPost().then((post)=>{
    //   setPosts(post)
    //  })
    // // có mỗi posts ở đây nó cập nhật luôn khi có giao diện thôi
    // handleCommentPost().then((comment)=>{
    //   console.log(comment)
    // })
    // push dữ liệu lên
    Promise.all([handleDataPost(),handleCommentPost(),handleReactions()]).then((
      [posts,comments,reactions]
    )=>
    { posts.forEach((post)=>{
      const lengthComment =  comments.filter((comment)=>{
        return comment.post_id === post.post_id
      })
      post['comment'] = lengthComment.length
    }
    )
      setReactions(reactions)
      setPosts(posts)
      setComments(comments)
    })  
  }, []); // Empty dependency array means it runs once on mount
  //render dữ liệu mới
  useEffect(() => {
    if (checkButtonShare) {
      newDataPosts().then((post)=>{
        setPosts(prevPosts => [post, ...prevPosts]);
      })
      setCheckButtonShare(false);
     // data moi 
    }
  }, [checkButtonShare]);

  const handleOnClick = () => {
    setCheckButtonShare(true);
  }
  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share onClick={handleOnClick} />
        {Posts.map((p) => {
         const reactionPost = Reactions.filter((reaction) =>(reaction.post_id === p.post_id))
         const commentPost =  Comments.filter((comment) => (comment.post_id === p.post_id))
         return <Post key ={p.post_id} post={p} comments = {commentPost} reaction = {reactionPost} />
        })}
      </div>
    </div>
  );
}
