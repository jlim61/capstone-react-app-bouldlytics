import { useEffect, useState } from "react";
import { User } from "../types";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import { Link } from 'react-router-dom'

export default function Users() {

// Using states to save user info change user results based on state
  const [users, setUsers] = useState<Array<Partial<User>>>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [radioValue, setRadioValue] = useState('1')

  const radios = [
    { name: 'All Users', value: '1' },
    { name: 'Setters', value: '2' },
  ];


// a useEffect CANNOT be async function, BUT you can hack around it by making the useEffect function
// call an async function like below
/*
  useEffect(()=>{
    (async ()=>{})()
  },[])
*/
  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const res = await fetch('https://bouldering-capstone.onrender.com/user')
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    } else {
      window.alert('Bad Request');
    }
  }

  function followUser() {}

  return (
    <Container id="all-users-container">
      <h2>Connect With Other Boulderers</h2><br />
      <ButtonGroup id="users-radio-buttons">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={'outline-dark'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <div>
        <input
          id="user-filter-search"
          type="text"
          placeholder="Type to filter by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Row id='user-info'>
        <Col className="users-column" xs={2}>
          <strong>⭐ = Setter </strong>
        </Col>
        <Col className="users-column">
          <strong>Username</strong>
        </Col>
        <Col className="users-column">
          <strong>Email</strong>
        </Col>
        <Col className="users-column">
          <strong>Follow</strong>
        </Col>
      </Row>
      <div id="all-users-div">
        {users
          .filter((user) => {
            if (radioValue === "2") {
              return user.setter === true;
            }
            return true;
          }).filter((user) => {
            if (user.username) {
                return user.username.toLowerCase().includes(searchQuery.toLowerCase());
            } return false
          }).map((user: Partial<User>) => (
            <Row key={user.id}>
              <Col className="users-column" xs={2}>
                {user.setter ? (
                  <span role="img" aria-label="star">⭐</span>
                ) : null}
              </Col>
              <Col className="users-column">
                <Link className="username-link" to=
                {localStorage.getItem('username') == user.username ?
                  '/my-data' : `/user-profile/${user.username}`}>{user.username}</Link>
              </Col>
              <Col className="users-column">{user.email}</Col>
              <Col className="users-column">
                {localStorage.getItem('token') && (
                  <Button className='project-boulder-follow-button' onClick={followUser}>Follow</Button>
                )}
              </Col>
            </Row>
          ))}
      </div>
    </Container>
  );
}
