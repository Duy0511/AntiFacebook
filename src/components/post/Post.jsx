import "./post.css"
import { MoreVert} from "@mui/icons-material"
import SendIcon from '@mui/icons-material/Send';
import {Users ,handlePushComment,handleCommentNew,handlePushReactions,handleUpdateReactions} from "../../dummyData"
import { useState, useContext ,useEffect } from "react"
import { valueContext } from "../../pages/home/Home";
import Comment from '../comment/Comment'
export default function Post({post , comments,reaction,render}) { // để tôi ưu hiệu năng thì mình nghĩ nên dùng mảng trong js để tránh bị request và render toàn bộ reaction , nhưng mình đang code thử nghiệm nên sẽ get toàn bộ data
    const {name,avatar,id} = useContext(valueContext)
    const [valueComment,setValueComment] = useState('')
    const [like, setLike] = useState(reaction.length) // như cái like này này
    const [reactions, setReactions] = useState(reaction) // không cần set thằng reactions lại vì mình lấy trực tiếp từ db ra, không nên request toàn bộ như này nó sẽ ảnh hưởng hiệu suât => chỉ lấy cái mới nhất
    const [icons, setIcon] = useState({
        isLiked: false,
        isHearted: false
      });
      useEffect(() => {
        //set like and heart buttons
        for(let i = 0 ; i < reactions.length; i++) {// hàm này để set true false cho like , ngay khi được render
            if(reactions[i].user_id == id){
            if (reactions[i].reactions_name === 'like' ) {
                setIcon(prev =>({
                  isLiked: true,
                  isHearted: false
                }));
              } else if (reactions[i].reactions_name === 'heart') {
                setIcon(prev =>({
                    isLiked: true,
                    isHearted: false
                  }));
              }
            }
        }
      }, []);
      
    function checkUserIdComment(){// nói chung là phải request thêm từ database về đây là nó mặc định r
        
        for(let i = 0 ; i< reaction.length ; i++){ // xử lý xong rồi này , đây là hàm logic khi không có thì push vào , khi có thì sẽ updaate thôi 
            if(reaction[i].user_id == id)
            {
                return false
            }
        }
        return true
    }
    useEffect(()=>{ // đây là hàm push lên khi trống
        if(checkUserIdComment()){
            if(icons.isHearted === true){
                handlePushReactions(post.post_id, 'heart' )
            }else if(icons.isLiked === true){
            handlePushReactions(post.post_id, 'like' )
        }
        render(prev => (!prev))
        }
    },[icons])
    const [isComment, setIsComment] = useState(false)
    const [arrayComments, setArrayComments] = useState(comments)
    const handleReactions = (test) => {
        // đây là khi update thì mới dùng
        if(test === 'like'){
            if(icons.isLiked === false){
                if(icons.isHearted === false){ // khi nut kia no khong duoc an thi minh moi tang , khong thi k tang

                    setLike(prev => prev + 1)
                }
                if(!checkUserIdComment()){ // kiểm tra nếu mảng rỗng thì k update
                    console.log('run update')
                    handleUpdateReactions(post.post_id, test)
                }
                setIcon(prev => ({isLiked : true ,isHearted : false}))
                
            }else{
                handleUpdateReactions(post.post_id, null)
                setIcon(prev => ({isLiked : false ,isHearted : false}))
                setLike(prev => prev - 1)
            }
        }else{
            if(icons.isHearted === false){
                if(icons.isLiked === false){
                    setLike(like + 1)
                }
                if(!checkUserIdComment()){// kiểm tra nếu mảng rỗng thì k update
                    console.log('run update')
                    handleUpdateReactions(post.post_id, test)
                }
                setIcon(prev =>({isHearted : true ,isLiked : false}))
                
            }else{
                handleUpdateReactions(post.post_id, null)
                setIcon(prev =>({isLiked : false ,isHearted : false}))
                setLike(like - 1)
            }
        }
    }
    const commentHandler = (e) => {
        setIsComment(!isComment)
    }
    const handleComment = (e) => {
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
                        <img className="likeIcon" src="assets/like2.png" key={'like'} onClick={()=>handleReactions('like')} alt="" />
                        <img className="likeIcon" src="assets/heart.png" key={'heart'} onClick={()=>handleReactions('heart')} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
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
                    <SendIcon onClick={handleComment}/> 
                </div>
            </button>
            
            </div>
            {isComment && arrayComments.map((comment)=>{
                return <Comment comment={comment}/>
            })}
        </div>
    )
}
