import "./post.css"
import { MoreVert} from "@mui/icons-material"
import SendIcon from '@mui/icons-material/Send';
import {Users ,handlePushComment,handleCommentNew,handlePushReactions} from "../../dummyData"
import { useState, useContext ,useEffect } from "react"
import { valueContext } from "../../pages/home/Home";

import Comment from '../comment/Comment'
export default function Post({post , comments,reaction}) {
    console.log(post)
    const {name,avatar} = useContext(valueContext)
    const [valueComment,setValueComment] = useState('')
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)
    const [isComment, setIsComment] = useState(false)
    const [arrayComments, setArrayComments] = useState(comments)
    const likeHandler = (test) => {
        console.log(test)
        handlePushReactions(post.post_id,test)
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    const commentHandler = (e) => {
        setIsComment(!isComment)
    }
    const handleClick = (e) => {
        if(!isComment){
            setIsComment(!isComment)
        }
        handlePushComment(valueComment,post.post_id).then(comment => {
            setArrayComments((prev) => [...prev,comment])
        })
        setValueComment('')
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src={avatar} alt="" />
                        <span className="postUsername">
                            {Users.filter((u) => u.id === post.userId)[0].username}
                        </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={post.photo} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="assets/like2.png" key={'like'} onClick={()=>likeHandler('like')} alt="" />
                        <img className="likeIcon" src="assets/heart.png" key={'tym'} onClick={()=>likeHandler('tym')} alt="" />
                        <span className="postLikeCounter">{reaction.length} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <button className="postCommentButton" onClick={commentHandler}>
                            <span className="postCommentText">{arrayComments.length} comments</span>
                        </button>
                    </div>
                </div>
            </div>
        
            <div className="postBottomComment">
                <img className="commentAvatar" src={avatar}></img>
            <input placeholder="Comment something ?" className="commentInput" value={valueComment} onChange={(e)=>{setValueComment(e.target.value)}}></input>
            <button className="sendButton">
                <div className="sendIcon">
                    <SendIcon onClick={handleClick}/> 
                </div>
            </button>
            
            </div>
            {isComment && arrayComments.map((comment)=>{
                return <Comment comment={comment}/>
            })}
        </div>
    )
}
