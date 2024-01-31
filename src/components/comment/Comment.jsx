import React, { useEffect, useState, useCallback } from 'react';
import "./Comment.css"
import { MoreVert } from "@mui/icons-material"
export default function Comment({comment}) {
    console.log(comment)
    return (
        <div className="comment">
            <div className="commentWrapper">
                <img src={comment.IMAGE} className="avartarComment"/>
                <div className="commentRight">
                    <div className="commentWrap">
                        <span className="nameUser">
                        {comment.username}
                    </span>
                    <span className="contentComment">{comment.comment}</span>
                    <img className='ImgReactionComment' src='assets/like2.png'></img>
                    </div>
                    <div className="commentBottom">
                        <span className="reactionComment">like</span>
                        <span className="replyComment">phản hồi</span>
                        <span className="createComment">{comment.created_at}</span>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
