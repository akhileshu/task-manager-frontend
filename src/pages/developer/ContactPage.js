import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/auth/authSlice";

function ContactPage() {
  const userInfo = useSelector(selectUserInfo);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      "Contact from your website - Task Manager App"
    );
    const emailBody = encodeURIComponent(
      `Email: ${email}\nMessage: ${message}`
    );
    const mailtoLink = `mailto:contactus.akhilesh@gmail.com?subject=${subject}&body=${emailBody}`;

    // Open the user's default email client with the pre-filled email
    window.location.href = mailtoLink;
  };

  return (
    <>
      {!userInfo && <Navigate to="/login" replace={true}></Navigate>}

      <Navigation />
      <Container className="mt-5">
        <div>
          <h1>Contact Us</h1>
          <p>Feel free to send us an email:</p>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={handleMessageChange}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSendEmail}>
              Send Email
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default ContactPage;
