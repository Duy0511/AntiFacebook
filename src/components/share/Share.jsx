import { PermMedia, Label, Room, EmojiEmotions, AddToPhotos, PeopleAlt, AddReaction, AddLocation, Gif, MoreHoriz, Close, Lock, ArrowDropDown, InsertEmoticon, AddPhotoAlternate} from "@mui/icons-material"
import "./share.css"
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { valueContext } from "../../pages/home/Home";
import {pustDataPost} from "../../data/getData";
import { fileToBase64 } from "../../data/toBase64"
import styles from './createPost.module.css'
import { IconButton } from "@mui/material";
export default function Share({onClick}) {
        const {name,avatar} = useContext(valueContext)
        const [imagePaths, setImagePaths] = useState([]);
        const [contentPost, setContentPost] = useState('');
        const [imageData, setImageData] = useState([]);
        const [convertImageData, setConvertImageData] = useState(null)
        const [turnOnPost,setTurnOnPost] = useState(false)
        const [turnOnImage,setTurnOnImage] = useState(true)
        const [isButtonCloseHovered, setIsButtonCloseHovered] = useState(false);
        const [isAddImagePostHovered, setIsAddImagePostHovered] = useState(false);
        const [height, setHeight] = useState(null);
        const [imageHeight, setImageHeight] = useState(null);
        const [imageWidth, setImageWidth] = useState(null);
        
        const onDrop = useCallback(acceptedFiles => {
             // truyền callback vào nếu file đúng thì thực hiện
             
        const paths = acceptedFiles.map(file => {
            setImagePaths(file)
            return URL.createObjectURL(file)
            // truyển thành file blob để in ra, có thể log ra màn hình 
        })
        console.log(paths)
        setImageData(prevPaths => [...prevPaths, ...paths]);
        
        }, [imagePaths]);
        
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ // 3 hàm , một hàm để mở chọn ảnh , một hàm để cho ảnh vào 
        onDrop,
        multiple: true,
        accept: 'image/*',
        });
        
        const handlePost =async (e) =>{
            console.log(imagePaths)
            setConvertImageData(await fileToBase64(imagePaths)) // set no se bi cham mot nhip 
            // no bang null tai vi no chua render lai giao dien nen no van la gia tri null ban dau
            const res = await pustDataPost(contentPost,await fileToBase64(imagePaths)) // nen gan luon nhu nay
            // in ra luon trong cung mot function no se chua gan vao duoc
            onClick()
        } 
        function handleButtonPost(e){
            setTurnOnPost(prev => !prev)
            
            console.log(turnOnPost)
        } 
        function handleImagePost(e){
            setTurnOnImage(prev =>!prev)
        }
        const handleMouseDown = (event) => {
            // loại bỏ hành vi mặc định
            event.preventDefault(); // Ngăn chặn focus khi click vào input
          };
        useEffect(()=>{
            //set width
            setImageWidth(100/imageData.length) 
            // set height
            function handleHeight(){
            if(imageData.length === 1){
                setHeight('auto')
                setImageHeight(null)
            }else{
                setHeight(221)
                setImageHeight(221)
                
            }  
            }
            handleHeight()
        })
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className={turnOnPost ? styles.createPost : styles.hidden}>
                <div className={styles.containerPost}>
                    <div className={styles.headerCreatePost}>
                        <div>Tạo bài viết</div>
                        <button className={styles.buttonClose}>
                            <Close onClick={(e)=>{handleButtonPost(e)}} className={styles.iconClose}/>
                        </button>
                        <div class={styles.clear}></div>
                    </div>
                    <div className={`${styles.bodyCreatePost} ${styles.padding16} ${styles.margin16}`}>
                        <div className={styles.wrapLeft}>
                            <img src={avatar} className={styles.imagePost} alt="" />
                        </div>
                        <div className={styles.wrapRight}>
                            <div className={styles.wrapTop}>
                                <div className={styles.nameUserPost}>{name}</div>
                            </div>
                            <div className={styles.wrapBottom}>
                                <div className={styles.itemBottom}>
                                
                                <Lock className={styles.lockIcon}/>
                                <div className={styles.settingPost}>Chỉ mình tôi </div>
                                <ArrowDropDown className={styles.dropDownIcon}/>
                            </div>
                            
                                
                            </div> 
                        </div>
                        
                    </div>
                    <div className={styles.pushData}>
                            <div className={styles.wrapTop}>
                                <div className={`${styles.wrapRow} ${styles.margin16} ${styles.margin_bottom24}`}>
                                    <input className={styles.inputPost} placeholder={`${name} ơi, bạn đang nghĩ gì thế?`}></input>
                                    <div className={styles.iconPost}><InsertEmoticon/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={`${styles.margin16} ${styles.wrapBottom} ${styles.wrapAddImage} ${styles.margin_bottom24}` } >
                                <div className=
                                        {`${turnOnImage ? styles.addImagePost : styles.hidden} 
                                        ${isAddImagePostHovered ? styles.addImagePostHovered : ''}
                                        ${(imageData.length === 0) ? '' : styles.max_height}
                                        `} 
                                        style={{ height:!isNaN(height) ? `${height}px` : height}}
                                        onMouseEnter={() => {
                                            setIsAddImagePostHovered(true);
                                            // Thêm bất kỳ xử lý nào khác bạn cần
                                          }}
                                          onMouseLeave={() => {
                                            setIsAddImagePostHovered(false);
                                            // Thêm bất kỳ xử lý nào khác bạn cần
                                          }}
                                          {...isButtonCloseHovered ? '' : {...getRootProps()}}
                                        //   onClick={}
                                        >
                                    {!(imageData.length === 0) ? '' : 
                                    <>
                                    <div className={styles.addPhotoIcon}><AddPhotoAlternate/></div>
                                    <div className="">Thêm ảnh / video</div>
                                    <div className={styles.opacity}><i>hoặc kéo và thả</i></div>
                                    </>
                                    }
                                    {/* có thì hiện không thì thôi*/}
                                    {(imageData.length === 0) ? '' :
                                    <>
                                        <div className="arrayImage">
                                      {imageData.map((path, index) => (
                                    <img key={index} src={path} alt={`Uploaded ${index}`} className="imageUpload" style={{ height: imageHeight ? `${imageHeight}px` : 'auto' , width : `${imageWidth}%`}} />
                                        ))}  
                                    </div>
                                    </>
                                    }
                                    <div 
                                    onMouseEnter={()=>{setIsButtonCloseHovered(true);setIsAddImagePostHovered(false)}} 
                                    onMouseLeave={() => {setIsButtonCloseHovered(false); setIsAddImagePostHovered(true)}}
                                    onClick={(e)=>{handleImagePost(e)}} 
                                    className={`${styles.buttonClose} ${styles.buttonCloseImage}`}><Close className={styles.iconClose}/></div>
                                </div>
                            </div>
                            
                    </div>
                    <div className={`${styles.bottomCreatePost} ${styles.margin16} ${styles.margin_bottom24}`}>
                        <div className={`${styles.itemBottomCreatePost}`}>
                            Thêm vào bài viết của bạn 
                            <div onClick={(e)=>{handleImagePost(e)}} className={`${styles.addImagePostIcon}`}>
                                <AddToPhotos></AddToPhotos>
                            </div>
                            <div className={`${styles.tagFriendIcon}`}>
                                <PeopleAlt></PeopleAlt>
                            </div>
                            <div className={`${styles.feelIcon}`}>
                                <AddReaction/>
                            </div>
                            <div className={`${styles.addLocationIcon}`}>
                                <AddLocation/>
                            </div>
                            <div className={`${styles.gifIcon}`}>
                                <Gif></Gif>
                            </div>
                            <div className={`${styles.optionIon}`}>
                                <MoreHoriz></MoreHoriz>
                            </div>
                        </div>
                    </div>
                    <div  className={` ${styles.margin16} ${styles.margin_bottom24}`}>
                        {/* để trong thẻ div vì div nó có tính chất block nên chỉ chiếm đến hết thẻ cha thôi, 
                        button là inline-block nên nó sẽ chèn cả ra ngoài khi không có div(set wid = 100%, nó không nhận đc boxsizing)=> nó + cả margin nên sẽ bị vượt quá */}
                    <button className={styles.buttonSend}>Đăng</button>
                    </div>

                </div>
            </div>
            <div className="shareTop">
                <img className="shareProfileImg" src={avatar} alt="" />
                <input
                    onMouseDown={handleMouseDown}
                    onFocus={handleMouseDown}
                    onClick={(e)=>{handleButtonPost(e)}}
                    placeholder={` What's in your mind ${name}`}
                    value={contentPost}
                    onChange={(e)=>{setContentPost(e.target.value)}}
                    className="shareInput" 
                />
            </div>
            <hr className="shareHr"/>
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption" onClick={(e)=>{handleButtonPost(e)}}>
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    </div>
                    <div className="shareOption" onClick={(e)=>{handleButtonPost(e)}}>
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption" onClick={(e)=>{handleButtonPost(e)}}>
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption" onClick={(e)=>{handleButtonPost(e)}}>
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


