import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/auth/authSlice";
import UserProfile from "../components/UserProfile";
import Navigation from "../components/Navigation";

function Profile() {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div>
      {!userInfo && <Navigate to="/login" replace={true}></Navigate>}

      <Navigation />
      <UserProfile/>
      
    </div>
  );
}

export default Profile;
