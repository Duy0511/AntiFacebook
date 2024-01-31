import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css" 
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataUser} from "../../data/getData"
import { createContext } from "react";
import io from 'socket.io-client';
export const valueContext = createContext()
// khi import từ tập tin có nhiều export thì cần dấu ngoặc còn tập tin export 1 biến thì không cần ngoặc
export default function Home() {
    const [socket, setSocket] = useState(null);
    const [name,setName] = useState('')
    const [avatar,setAvattar] = useState('')
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const Check = async ()=>{
        const res = await getDataUser()
        console.log(res)
        if(res.data.valid){
            setName(res.data.username)
            setAvattar(res.data.image) 
        }else{
            navigate('/login')
        }
    }
    // const sendData = () => {
    //     // Gửi tin nhắn lên server
    //     socket.emit(`${name}`, message);
    //     setMessage('');
    //   };
    useEffect(()=>{

        Check()
        // const newSocket = io('http://localhost:3001');
        //     setSocket(newSocket);
        //     newSocket.on('message', (data) => {// xử lý xự kiện khi nhận được tin nhắn từ server
        //         setMessages([...messages, data]);
        //       });
        // return () => {
        //     newSocket.disconnect();
        //   };
    },[])

//     socket.emit('chỗ để lấy', /* … */); // gửi lên server đê server có thể nhận được 'chỗ để lấy'
//   io.emit('broadcast', /* … */); // ai trong đường dẫn đấy cx nhận được
//   socket.on('reply', () => { /* … */ }); // xử lý xự kiện khi nhận được tin nhắn từ server
    return (
        <valueContext.Provider value={{
            name,
            avatar
        }}>
        <div>
            <Topbar />
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </div>
        </valueContext.Provider>
    )
}