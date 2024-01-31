import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {Routes, Route,Link} from 'react-router-dom'
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signin" element={<Register />} />
        <Route path='/login'element= {<Login/>}/> 
        <Route path="/" element = {<Home/>}/>
      </Routes>
    </div>
  )
}

export default App;
