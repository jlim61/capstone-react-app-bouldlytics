import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import Stack from 'react-bootstrap/esm/Stack';
import { UserContext } from '../Contexts/UserProvider';

export default function Heading() {

  const { user } = useContext(UserContext)

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  useEffect(()=>{
    if(!localStorage.getItem('token') && !user.token) {
      user.token = localStorage.getItem('token')!
    }
  },[user])

  return (
    <div className="sticky-navbar">
      <Navbar id="nav-bar" className="bg-body-tertiary" expand="xxl">
        <Container fluid id="nav-bar-container">
          <div className="d-flex w-100">
            <a href="#offcanvasNavbar-expand" role="button" className="me-2" onClick={handleOffcanvasToggle}>
            <img id="bouldlytics-logo" src="bouldlytics-logo.png" alt="Toggle" />
            </a>
            <Navbar.Brand as={NavLink} to="/" id="bouldlytics-heading">Bouldlytics</Navbar.Brand>
            <Stack id="navbar-stack" className="ms-auto" direction="horizontal">
              {/* operator below to make only certain elements show if user logged in */}
              { !localStorage.getItem('token') ?
              <>
              <Nav.Item>
                <Nav.Link id="navbar-login" as={NavLink} to="/login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link id="navbar-signup" as={NavLink} to="/register">Sign Up</Nav.Link>
              </Nav.Item> </>:
              <Nav.Item>
                <Nav.Link id="navbar-logout" as={NavLink} to="/logout">Logout</Nav.Link>
              </Nav.Item>
              }
            </Stack>
          </div>

        </Container>
      </Navbar>

      <Offcanvas id="off-canvas-nav" show={showOffcanvas} onHide={handleOffcanvasToggle} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel-expand" className="offcanvas-heading"><Nav.Link href="/">Bouldlytics</Nav.Link></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="justify-content-between flex-grow-1 pe-3">
        {/* operator below to make only certain elements show if user logged in */}
        { !localStorage.getItem('token') ?
              <>
          <Nav.Item>
            <Nav.Link className="offcanvas-user-button offcanvas-links" href="/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="offcanvas-user-button offcanvas-links" href="/register">Sign Up</Nav.Link>
          </Nav.Item> </>:
          <>
          <Nav.Item>
            <Nav.Link className="offcanvas-user-button offcanvas-links" as={NavLink} to="/logout">Logout</Nav.Link>
          </Nav.Item>
            <Nav className="d-flex flex-column">
            <Nav.Link href="/my-data" className="offcanvas-links offcanvas-items">My Data</Nav.Link>
            <Nav.Link href="/bouldering-info" className="offcanvas-links offcanvas-items">What is Bouldering?</Nav.Link>
            <Nav.Link href="#action1" className="offcanvas-links offcanvas-items">Gym Boulders</Nav.Link>
            <Nav.Link href="/moonboard" className="offcanvas-links offcanvas-items">MoonBoard Boulders</Nav.Link>
            <Nav.Link href="#action2" className="offcanvas-links offcanvas-items">Training</Nav.Link>
            <Nav.Link href="/users" className="offcanvas-links offcanvas-items">Find Boulderers</Nav.Link>
          </Nav>
          </>
        }
        </Nav>

        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
