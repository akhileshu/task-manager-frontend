import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/auth/authSlice";

function AboutApp() {
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      {!userInfo && <Navigate to="/login" replace={true}></Navigate>}

      <Navigation />
      <Container className="mt-5">
        <h1>About Task Manager App</h1>
        <Card>
          <Card.Body>
            <Card.Title>Welcome to Task Manager App!</Card.Title>
            <Card.Text>
              Task Manager App is a powerful and user-friendly task management
              solution built using the MERN stack (MongoDB, Express.js, React,
              and Node.js). Whether you're an individual looking to organize
              your personal tasks or a team collaborating on projects, Task
              Manager App has you covered.
            </Card.Text>
            <Card.Text>
              Key Features:
              <ul>
                <li>
                  Create an account and securely log in to manage your tasks.
                </li>
                <li>Create, update, and delete tasks with ease.</li>
                <li>View your tasks in a clear and organized manner.</li>
              </ul>
            </Card.Text>
            <Card.Text>
              We are committed to providing a seamless task management
              experience for our users. If you have any questions or feedback,
              please don't hesitate to <Link to="/contactUs">contact us</Link>.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AboutApp;
