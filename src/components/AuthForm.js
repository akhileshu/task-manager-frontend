import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

// * this component is used for both login and signup
function AuthForm({
  togglePasswordVisibility,
  email,
  name,
  setName,
  password,
  setEmail,
  setPassword,
  passwordVisible,
  handleLogin,
  handleSignup,
}) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = () => {
    validateEmail();
    validatePassword();

    // If there are no errors, proceed with login or signup
    if (!emailError && !passwordError) {
      if (handleLogin) {
        handleLogin();
      } else {
        handleSignup();
      }
    }
  };

  return (
    // Container will have a width of 50% on medium (desktop) screens (w-md-50) and a width of 75% on small (smartphone) screens (w-sm-75)
    <Container className="mt-4 custom-container">
      {" "}
      <h2>{handleLogin ? "Login" : "Signup"}</h2>
      <Form>
        {handleSignup ? (
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
            <Form.Text className="text-muted">
              we are greatful to see you here
            </Form.Text>
          </Form.Group>
        ) : null}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail} // Validate email on blur
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <div>
          <Form.Text className="text-danger">{emailError}</Form.Text>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword} // Validate password on blur
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
          />
          <Form.Text className="text-danger">{passwordError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onClick={togglePasswordVisibility}
            type="checkbox"
            label="Show Password"
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <Link to={handleLogin ? "/signup" : "/login"}>
        {handleLogin ? "New to our App! Signup" : "Already Registered! Login"}
      </Link>
    </Container>
  );
}

export default AuthForm;
