// Replace with your email address
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

function DeveloperPage() {
  const userInfo = useSelector(selectUserInfo);

  const githubLink = "https://github.com/akhileshu"; // Replace with your GitHub profile URL
  const email = "contactus.akhilesh@gmail.com";

  return (
    <>
      {!userInfo && <Navigate to="/login" replace={true}></Navigate>}

      <Navigation />
      <Container>
        <h1 className="mt-5">Developer Page</h1>
        <p>Hi there! I'm Akhilesh, the developer of this task manager app.</p>
        <p>
          If you have any questions or feedback, feel free to reach out to me:
        </p>
        <Row>
          <Col>
            <strong>GitHub:</strong>
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              Visit my GitHub profile
            </a>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <strong>Email:</strong>
            <a href={`mailto:${email}`} className="ml-2">
              {email}
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DeveloperPage;
