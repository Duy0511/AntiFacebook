import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import "./share.css"
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { valueContext } from "../../pages/home/Home";
import {pustDataPost} from "../../data/getData";
import { fileToBase64 } from "../../data/toBase64"
export default function Share({onClick}) {
        const {name,avatar} = useContext(valueContext)
        const [imagePaths, setImagePaths] = useState([]);
        const [contentPost, setContentPost] = useState('');
        const [imageData, setImageData] = useState([]);
        const [convertImageData, setConvertImageData] = useState(null)
        const onDrop = useCallback(acceptedFiles => {
        const paths = acceptedFiles.map(file => {
            setImagePaths(file)
            return URL.createObjectURL(file)
        })
        setImageData(prevPaths => [...prevPaths, ...paths]);
        
        }, [imagePaths]);
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        accept: 'image/*',
        });
        const handlePost =async (e) =>{
            setConvertImageData(await fileToBase64(imagePaths)) // set no se bi cham mot nhip 
            // no bang null tai vi no chua render lai giao dien nen no van la gia tri null ban dau
            const res = await pustDataPost(contentPost,await fileToBase64(imagePaths)) // nen gan luon nhu nay
            // in ra luon trong cung mot function no se chua gan vao duoc
            onClick()
        }   
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={avatar} alt="" />
                <input
                    placeholder={`What's in your mind ${name}`}
                    value={contentPost}
                    onChange={(e)=>{setContentPost(e.target.value)}}
                    className="shareInput" 
                />
                {imageData.map((path, index) => (
                <img key={index} src={path} alt={`Uploaded ${index}`} className="imageUpload" />
        ))}
            </div>
            <hr className="shareHr"/>
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <div>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <span className="shareOptionText">Photo or Video</span>
                    </div>
                    </div>
                    </div>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" onClick={handlePost}>Share</button>

            </div>
        </div>
    </div>
  )
}


