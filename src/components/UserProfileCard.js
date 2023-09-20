import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UserProfileCard({name,email,setIsEditing}) {
  return (
    <Container className="mt-4">
      <Card >
        <Card.Header>Your Profile</Card.Header>
        <Card.Body>
          <Card.Title>Name</Card.Title>
          <Card.Text>
            {name}
          </Card.Text>
          <Card.Title>Email</Card.Title>
          <Card.Text>
          {email}
          </Card.Text>
        </Card.Body>
        <Button onClick={()=>setIsEditing(true)} variant="primary">Edit Profile</Button>
      </Card>
    </Container>
  );
}

export default UserProfileCard;
