import React, { useState } from "react";
import {  Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAsync,
  selectError,
  selectUserInfo,
  setError,
} from "../features/auth/authSlice";
import AuthForm from "../components/AuthForm";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const error = useSelector(selectError);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignup = () => {
    // Add your signup logic here, e.g., send a POST request to your API.
    if (name && email && password) {
      // console.log("Signing up with name:", name, "email:", email);
      dispatch(createUserAsync({ name, email, password }));
    } else {
      dispatch(setError("all fileds are mandatory "));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // i am unable to use submit on this form , and unable to use required on inputs
  return (
    <div>
      {userInfo ? (
        <Navigate to="/" replace={true}></Navigate>
      ) : (
        <>
          <AuthForm
            handleSignup={handleSignup}
            passwordVisible={passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            password={password}
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
            setPassword={setPassword}
          />
          {error &&
            (error ===
            "Request failed with status code 400 from createUserAsync.rejected" ? (
              <p className="errorMsg">
                {"Please try with a different Email Id or try after some time"}
              </p>
            ) : (
              <p className="errorMsg">{error}</p>
            ))}
        </>
      )}
    </div>
  );
}

export default Signup;
