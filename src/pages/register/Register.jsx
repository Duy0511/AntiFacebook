import "../register/register.css"
import { useFormik } from "formik"
import * as Yup from 'yup';
import {Link} from 'react-router-dom'
import axios from "axios";
import Fingerprint2 from 'fingerprintjs2';
import { useState,useEffect } from 'react';
function Register() {
  const [deviceId,setDeviceId] = useState()
  useEffect(() => {
    // Generate a unique fingerprint for the device
    Fingerprint2.get({}, (components) => {
      const fingerprint = Fingerprint2.x64hash128(components.map((pair) => pair.value).join(''), 31);
      
      // Now you can use the generated fingerprint as a device identifier
      setDeviceId(fingerprint);
    });
  }, []);
    const formik = useFormik({
        initialValues:{
            name: '',
            email : '',
            password : '',
            confirmPassword : '',
            signUpStatus : '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(5, 'Tên chỉ tôi thiểu là 5 kí tự')
            .max(25,'Tên tôi đa là 15 kí tự')
            .required('Phải điền tên vào'),
            email: Yup.string().email('Sai định dạng email')
            .required('Phải điền email vào'),
            password : Yup.string().min(6, 'Password tối thiểu là 6 kí tự')
            .max(10, 'Password tối đa là 10 kí tự')
            .matches("^[a-z0-9]+$" ,'Password không chứa kí tự đặc biệt')
            .required('Phải nhập password vào'),
            confirmPassword : Yup.string().oneOf([Yup.ref('password')],'Password nhập lại không đúng')
            .required('Phải nhập password vào')
        }),
    })
    const data = async () => {
        try {
          const res = await axios.put('http://localhost:3001/signin', {
            deviceId: deviceId,
            name : formik.values.name,
            email: formik.values.email,
            password: formik.values.password,
          });
          if (res.data.status === 'success') {
            formik.setFieldValue('signUpStatus',`${res.data.message}`)
          }else{
            throw new Error(`${res.data.message}`)
          }
        } catch (err) {
          if(err.response){
            formik.setFieldValue('signUpStatus',`${err.response.data.message}`)
          }else{
            formik.setFieldValue('signUpStatus','Không thể kết nối tới server')
          }
        }
      };
    const handleSubmit = (e) => {
        // e.preventDefault()
        formik.handleSubmit(e)
        data()
    }
  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">HminhSocial</h3>
                <span className="registerDesc">
                    Connect with friends and the world around you on HminhSocial.{""}
                </span>
            </div>
            <div className="registerRight">
                <div className="registerBox">
                    <form action="" onSubmit={handleSubmit} className="registerBox">
                       <input placeholder="Username" className="registerInput" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.name && formik.touched.name && (<span style={{color : 'red'}}>
                        
                        {formik.errors.name}
                    </span>)}
                    <input placeholder="Email" className="registerInput" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.email && formik.touched.email  && (<span style={{color : 'red'}}>
                        {formik.errors.email}
                    </span>)}
                    <input placeholder="Password" className="registerInput" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.password && formik.touched.password && (<span style={{color : 'red'}}>
                        
                        {formik.errors.password}
                    </span>)}
                    <input placeholder="Password Again" className="registerInput" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (<span style={{color : 'red'}}>
                        {formik.errors.confirmPassword}
                    </span>)}
                    <button className="registerButton">Sign Up</button>
                    <Link to="/login" className="wrraperButton">
                    <button type="submit" className="loginRegisterButton">
                        Log into Account
                    </button>
                    </Link>
                    {formik.values.signUpStatus && <span style={{color : 'red', alignSelf :"center"}} >{formik.values.signUpStatus}</span>}
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}
export default Register
