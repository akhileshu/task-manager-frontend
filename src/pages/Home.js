import React from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link for routing
import "../cssFiles/home.css";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/auth/authSlice";
import LogoutButton from "../components/Logout";
import { selectTasksLoaded } from "../features/task/taskSlice";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";

function Home() {
  const user = useSelector(selectUserInfo);
  const tasksLoaded = useSelector(selectTasksLoaded); //resembles user,tasks both loaded

  return (
    <>
      {!user && <Navigate to="/login" replace={true}></Navigate>}
      {tasksLoaded ? (
        <div className="home-container">
          <h1>Welcome to My Web App</h1>
          <div className="button-container">
            <Link to="/tasks" >
            <Button variant="primary">MY Tasks</Button>
              
            </Link>
            <div >
              <LogoutButton  />
            </div>
          </div>
        </div>
      ) : (
        <Loader/>
      )}
    </>
  );
}

export default Home;
