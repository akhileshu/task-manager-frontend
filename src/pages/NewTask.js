import React from "react";
import { selectUserInfo } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CreateTask from "../features/task/components/CreateTask";
import { selectTasksLoaded } from "../features/task/taskSlice";
import Loader from "../components/Loader";
import Navigation from "../components/Navigation";

function NewTask() {
  const userInfo = useSelector(selectUserInfo);
  const tasksLoaded = useSelector(selectTasksLoaded); //resembles user,tasks both loaded

  return (
    <>
      {!userInfo && <Navigate to="/login" replace={true}></Navigate>}
      {tasksLoaded ? (
        <>
          <Navigation />
          <CreateTask />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default NewTask;
