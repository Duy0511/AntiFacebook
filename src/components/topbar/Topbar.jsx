import "./topbar.css"
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {valueContext} from '../../pages/home/Home'
const UploadImage = () => {
    const [imageData, setImageData] = useState(null);
   
    const onDrop = useCallback(acceptedFiles => {
       const file = acceptedFiles[0];
       const reader = new FileReader();
   
       reader.onabort = () => console.log('file reading was aborted');
       reader.onerror = () => console.log('file reading has failed');
       reader.onload = () => {
         const binaryStr = reader.result;
         
       };
       reader.readAsArrayBuffer(file);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/*',
     });
}
const Avartar = () =>{
    useEffect(() =>{
        // const res = axios.
    })
}
export default function Topbar() {
    // phải lấy {user} chứ k là user 
    const {name,avatar} = useContext(valueContext)
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">HminhSocial</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friend, post or video" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img src={avatar} alt="" className="topbarImg"/>
            </div>
            
        </div>
    )
} 