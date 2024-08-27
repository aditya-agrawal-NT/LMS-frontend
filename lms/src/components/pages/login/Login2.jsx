import React, {useState} from "react";
import "./Login2.css";
import image from "../../../assets/login-image.jpeg";
import Button from "../../shared/button/Button";

const Login2 = () => {
    const [role, setRole] = useState("user");
  
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  
    const handleRoleChange = (event) => {
      setRole(event.target.value);
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
          {/* <p></p> */}
          </div>
          <div className="radio-group">
            <label className="radio-label label-text">
              <input
                style={{ margin: "0", marginRight: "6px" }}
                className="radio-input"
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={handleRoleChange}
              />{" "}
              User
            </label>
            <label className="radio-label label-text">
              <input
                style={{ margin: "0", marginRight: "6px" }}
                className="radio-input"
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={handleRoleChange}
              />{" "}
              Admin
            </label>
          </div>
          <label
            style={{ marginBottom: "5px" }}
            className="label-text"
            htmlFor="email"
          >
            {role === "admin" ? "Mobile Number/Email:" : "Mobile Number:"}
          </label>
          <input
            className="login-input"
            type="mobile"
            id="mobile"
            // value={email}
            // onChange={handleEmailChange}
            required
          />
          <label
            style={{ marginBottom: "5px" }}
            className="label-text"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="login-input"
            type="text"
            id="password"
            // value={password}
            // onChange={handlePasswordChange}
            required
          />
          <div className='checkbox'>
        <input
          type="checkbox"
          required={true}
        />
        <div className='checkbox-text'>Agree to all Terms and Conditions?</div>
        </div>
          <Button text="Login" type="submit" />
        </div>
      </div>
    </div>
  );
};

export default Login2;
