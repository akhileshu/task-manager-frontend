import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// my imports
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/auth/authSlice";

function Navigation () {
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      {userInfo && (
        
        <Navbar className="MyNav" bg="primary" data-bs-theme="dark">
          <Container>
            {/* <Navbar.Brand href="#">TaskManager</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/tasks">Tasks</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/newTask">Create</Link>
                </Nav.Link>

                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/profile">Profile</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    
                      <LogoutButton />
                    
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/developer">developer</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/contactUs">Contact Us</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/about">About App</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default Navigation;
