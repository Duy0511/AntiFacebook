import "../login/login.css"
import { useFormik } from "formik"
import * as Yup from 'yup';
import axios from "axios";
import {Link,useNavigate } from 'react-router-dom'
import { useEffect } from "react";
export default function Login() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            email : '',
            password : '',
            loginStatus : '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Sai định dạng email')
            .required('Phải điền email vào'),
            password : Yup.string().min(6, 'Password tối thiểu là 6 kí tự')
            .max(10, 'Password tối đa là 10 kí tự')
            .matches("^[a-z0-9]+$" ,'Password không chứa kí tự đặc biệt')
            .required('Phải nhập password vào'),
        }),
        
    })
    const data = async () => {
        try {
          const res = await axios.post('http://localhost:3001/login', {
            email: formik.values.email,
            password: formik.values.password,
          });
          if (res.data.status === 'success') {

            formik.setFieldValue('loginStatus',`${res.data.message}`)
            navigate('/');
          }else{
            throw new Error(`co loi xay ra khi gui cookie`)
          }
        } catch (err) {
          if(err){
            console.log(err)
            formik.setFieldValue('loginStatus',`${err.response.data.message}`)
          }
        }
      };
    axios.defaults.withCredentials = true;
    // cái này giúp bắn cookie lên bằng axios, nếu không có cái này nó sẽ không tự động gửi 
    // phải có cái này thi yêu cầu api từ chỗ khác mới có thể dùng được session
    const handleSubmit = (e) => {
        e.preventDefault()
        formik.handleSubmit(e)
        data()

    }
    const handleChange = (e) =>{
      formik.values.loginStatus = ''
      formik.handleChange(e)
    }
    
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">HminhSocial</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on HminhSocial.{""}
                </span>
            </div>
            <div className="loginRight">
                <form action="" onSubmit={handleSubmit}>
                    <div className="loginBox">
                    <input placeholder="Email" name="email" className="loginInput" onChange={handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.email && formik.touched.email && (<span style={{color : 'red'}}>
                        {formik.errors.email}
                    </span>)}
                    <input placeholder="Password" name="password" className="loginInput" onChange={handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.password && formik.touched.password && (<span style={{color : 'red'}}>
                        {formik.errors.password}
                    </span>)}
                    <button className="loginButton" type="submit">Log In</button>
                    <span className="loginForgot" >Forgot Password?</span>
                    <Link to='/signin' className="wrraperButton">
                    <button  className="loginRegisterButton">
                        Create a New Account
                    </button>
                    </Link>
                    {formik.values.loginStatus && <span style={{color : 'red', alignSelf :"center"}} >{formik.values.loginStatus}</span>}
                </div>
                </form>
                
            </div>
        </div>
    </div>
  )
}
