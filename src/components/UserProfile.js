import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectUserInfo,
  setError,
  updateUserAsync,
} from "../features/auth/authSlice";
import UserProfileCard from "./UserProfileCard";
import EditProfileForm from "./EditProfileForm";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);

 
  const handleSubmit = () => {
    setIsEditing(false);

    if (userInfo) {
      // send API request only if required
      if (!name || !email) {
        setEmail(userInfo.email); // Update email immediately
        setName(userInfo.name);
        dispatch(setError("fields can't be empty"));
        // alert("fields can't be empty");
        return;
      }
      if (name === userInfo.name && email === userInfo.email) {
        dispatch(setError("Please add updated fields"));

        // alert("Please add updated fields");
        return;
      } else {
        // console.log(userInfo);
        dispatch(updateUserAsync({ name, email, _id: userInfo._id }));
      }
    }
  };

  return (
    <>
      {userInfo && (
        <div>
          {isEditing ? (
            <EditProfileForm
              userName={userInfo.name}
              userEmail={userInfo.email}
              setIsEditing={setIsEditing}
              handleSubmit={handleSubmit}
              setEmail={setEmail}
              setName={setName}
              name={name}
              email={email}
            />
          ) : (
            <UserProfileCard
              setIsEditing={setIsEditing}
              name={name}
              email={email}
            />
          )}
          {error && <p className="errorMsg">{error}</p>}
        </div>
      )}
    </>
  );
};

export default UserProfile;
