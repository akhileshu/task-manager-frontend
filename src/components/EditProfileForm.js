import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditProfileForm({
  setIsEditing,
  name,
  email,
  setName,
  setEmail,
  handleSubmit,
  userName,
  userEmail
}) {
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Custom email validation logic
    if (!value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    // Custom name validation logic
    if (value.length < 3) {
      setNameError("Name must be at least 3 characters");
    } else {
      setNameError("");
    }
  };

  const isFormValid = !emailError && !nameError;

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required // HTML5 required attribute for mandatory field
          />
          <Form.Text className="text-danger">{emailError}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleNameChange}
            required // HTML5 required attribute for mandatory field
          />
          <Form.Text className="text-danger">{nameError}</Form.Text>
        </Form.Group>
        <Button
          type="button"
          variant="danger"
          onClick={() => {
              setName(userName);
              setEmail(userEmail);
              setIsEditing(false);
          }}
        >
          Cancel
        </Button>{" "}
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default EditProfileForm;
