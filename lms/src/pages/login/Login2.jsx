import React, {useEffect, useState} from "react";
import "./Login2.css";
import './Login.css';
import image from "../../assets/login-image.jpeg";
import Button from "../../components/shared/button/Button";
import { userLogin } from "../../service/UserService";
import { login } from "../../redux/authentication/authActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

const Login2 = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);

    const [role, setRole] = useState("user");
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [errors, setErrors] = useState({});

    useEffect (() => {
      if (auth && auth.token) {
        if (auth.role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }
    }, [auth, navigate]);
  
    const validateForm = () => {
      let formErrors = {};
      if (!userName) formErrors.userName = "Username is Required!";
      if (!password) formErrors.password = "Password is Required!";
      if (!checkboxChecked) formErrors.checkbox = "You must agree!";
      return formErrors;
    };
  
    const handleLoginClick = async () => {

      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0){
        setErrors(formErrors)
        return;
      }

      try{
        const encodedPassword = btoa(password);
        const data = await userLogin({userName, "password": encodedPassword});
        dispatch(login(data));
        window.localStorage.setItem('authtoken', data.token);
      } catch(error){
        console.log(error)
      }
    };
  
  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-img">
          <img src={image} alt="login-side-img" />
        </div>

        <div className="form-container">
          <p className="login-header">Login</p>
          <div className="login-info">
          <p>Welcome back!</p>
          <p>Please log in to access your library account.</p>
          </div>
          <label
            style={{ marginBottom: "5px" }}
            className="label-text"
            htmlFor="email"
          >
            Username:
          </label>
          <input
            className="login-input"
            type="text"
            id="mobile"
            value={userName}
            onChange={e => {
              setUserName(e.target.value);
              setErrors({ ...errors, userName: '' });
            }}
            required
          />
          {errors.userName && <div className="error-text">{errors.userName}</div>}
          <label
            style={{ marginBottom: "5px" }}
            className="label-text"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="login-input"
            type="password"
            id="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: '' });
              
            }}
            required
          />
          {errors.password && <div className="error-text">{errors.password}</div>}
          <div className='checkbox'>
        <input
          type="checkbox"
          required={true}
          checked={checkboxChecked}
          onChange={() => {
            setCheckboxChecked(!checkboxChecked);
            setErrors({ ...errors, checkbox: '' });
          }}
        />
        <div className='checkbox-text' required>Agree to all Terms and Conditions?</div>
        </div>
        {errors.checkbox && <div className="error-text">{errors.checkbox}</div>}

          <Button text="Login" type="submit" onClick={handleLoginClick} />
        </div>
      </div>
    </div>
  );
};

export default Login2;
