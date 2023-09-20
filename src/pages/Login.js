import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  loginUserAsync,
  selectError,
  selectUserInfo,
} from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/AuthForm";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const error = useSelector(selectError);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // console.log(error)
  const handleLogin = () => {
    // Add your login logic here, e.g., send a POST request to your API.

    // console.log("Logging in with email:", email);
    dispatch(loginUserAsync({ email, password }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="loginContainer">
      {userInfo ? (
        <Navigate to="/" replace={true}></Navigate>
      ) : (
        <>
          <AuthForm
            handleLogin={handleLogin}
            passwordVisible={passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />
          {error && <p className="errorMsg">{error}</p>}
        </>
      )}
    </div>
  );
}

export default Login;
