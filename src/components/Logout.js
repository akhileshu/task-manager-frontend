// LogoutButton.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "../features/auth/authSlice";
import { selectUserInfo } from "../features/auth/authSlice";
import Button from "react-bootstrap/Button";

function LogoutButton() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      {userInfo && (
        <Button variant="light" onClick={() => dispatch(logoutUserAsync())}>
          Logout
        </Button>
      )}
    </>
  );
}

export default LogoutButton;
