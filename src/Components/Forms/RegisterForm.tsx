import { useEffect, useRef, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useNavigate } from "react-router-dom";
import { User } from '../../types';



export default function RegisterForm() {

  const navigate = useNavigate()

  const [userValue, setUserValue] = useState('1');

  const userStatus = [
    { name: 'User', value: '1' },
    { name: 'Setter', value: '2' },
  ];

  const usernameField = useRef<HTMLInputElement>(null)
  const emailField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)
  const firstNameField = useRef<HTMLInputElement>(null)
  const lastNameField = useRef<HTMLInputElement>(null)
  const isSetter = userValue === '2' // should return "true" value if "setter" selected, false if "user" selected

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  },[])

  async function handleRegisterData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const user =  {
      username: usernameField.current!.value,
      email: emailField.current!.value,
      password: passwordField.current!.value,
      first_name: '',
      last_name: '',
      setter: isSetter
      }
      if (firstNameField.current?.value) {
        user.first_name = firstNameField.current.value;
      }
      if (lastNameField.current?.value) {
        user.last_name = lastNameField.current.value;
      }
      clearFormData() // reset values on input fields to blank
      setUserValue('1') // reset radio button to selecting user
      await registerUser(user)
    }

    function clearFormData() {
      usernameField.current!.value = ''
      emailField.current!.value = ''
      passwordField.current!.value = ''
      firstNameField.current!.value = ''
      lastNameField.current!.value = ''

    }

    async function registerUser(user: User){
      console.log(user)
      const res = await fetch('https://bouldering-capstone.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      console.log(data)
      if (!res.ok){
        window.alert('Register Failed')
      } else navigate('/')

    }

  return (
    <>
    <form id="register-form" onSubmit={handleRegisterData}>
        <div id="register-form-div">
            <h3 id="login-header">Register</h3><br /><br /><br />
            <label className="register-form-label" htmlFor="username">Username</label>
            <input className="register-user-input-field" type="text" name="username" ref={usernameField} required />
            <label className="register-form-label" htmlFor="email">Email</label>
            <input className="register-user-input-field" type="text" name="email" ref={emailField} required />
            <label className="register-form-label" htmlFor="password">Password</label>
            <input className="register-user-input-field" type="text" name="password" ref={passwordField} required />
            <label className="register-form-label" htmlFor="first-name">First Name</label>
            <input className="register-user-input-field" type="text" name="first-name" ref={firstNameField} />
            <label className="register-form-label" htmlFor="last-name">Last Name</label>
            <input className="register-user-input-field" type="text" name="last-name" ref={lastNameField} />
            <label className="register-form-label" htmlFor="user-type">User Type</label>
            <ButtonGroup>
              {userStatus.map((user, idx) => (
                <ToggleButton
                  key={idx}
                  id={`user-${idx}`}
                  type="radio"
                  variant={user.value === '1' ? 'primary' : 'primary'}
                  name="user"
                  value={user.value}
                  checked={userValue === user.value}
                  onChange={(e) => setUserValue(e.currentTarget.value)}
                  className={user.value === '1' ? 'user-button' : 'setter-button'}
                >
                  {user.name}
                </ToggleButton>
              ))}
            </ButtonGroup><br />
            <input id="register-form-sign-up" type="submit" value='Sign Up' />
        </div>
    </form>
    </>
  )
}
