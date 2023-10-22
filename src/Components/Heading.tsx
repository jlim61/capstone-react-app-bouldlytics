import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import Stack from 'react-bootstrap/esm/Stack';

export default function Heading() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <div>
      <Navbar id="nav-bar" className="bg-body-tertiary mb-3" expand="xxl">
        <Container fluid id="nav-bar-container">
          <div className="d-flex w-100">
            <a href="#offcanvasNavbar-expand" role="button" className="me-2" onClick={handleOffcanvasToggle}>
            <img id="bouldlytics-logo" src="bouldlytics-logo.png" alt="Toggle" />
            </a>
            <Navbar.Brand as={NavLink} to="/" id="bouldlytics-heading">Bouldlytics</Navbar.Brand>
            <Stack id="navbar-stack" className="ms-auto" direction="horizontal">
              <Nav.Link id="navbar-login" as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link id="navbar-signup" as={NavLink} to="/register">Sign Up</Nav.Link>
            </Stack>
          </div>

        </Container>
      </Navbar>

      <Offcanvas id="off-canvas-nav" show={showOffcanvas} onHide={handleOffcanvasToggle} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel-expand">Bouldlytics</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="justify-content-between flex-grow-1 pe-3">
            <Nav.Link href="/register">Login</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
        </Nav>
        <Nav className="d-flex flex-column">
            <Nav.Link href="#action1">My Data</Nav.Link>
            <Nav.Link href="#action1">Gym Boulders</Nav.Link>
            <Nav.Link href="#action2">MoonBoard Boulders</Nav.Link>
            <Nav.Link href="#action2">Training</Nav.Link>
        </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
