import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../../types'
import { UserContext } from '../../Contexts/UserProvider';



export default function LoginForm() {

  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)
  console.log(user, 'from login page')

  const usernameField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  },[])

  async function handleLoginData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const loginInfo: Partial<User> = {
      username: usernameField.current!.value,
      password: passwordField.current!.value
    }
    clearForm()
    loginUser(loginInfo)
    navigate('/')
  }

  function clearForm(){
    usernameField.current!.value='',
    passwordField.current!.value=''
  }

  async function loginUser(loginInfo: Partial<User>) {
    const res = await fetch('https://bouldering-capstone.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo)
    })
    if (res.ok) {
      const data = await res.json()
      console.log(data)
      const accessToken = data.access_token
      const username = loginInfo.username ? loginInfo.username : ''
      setUser({token: accessToken, username: username})
      localStorage.setItem('token', accessToken)
      localStorage.setItem('username', loginInfo.username!) //maybe not use here, maybe in useContext
    } else window.alert('Failed Login')
  }

  return (
    <form id="login-form" onSubmit={handleLoginData}>
    <div id="login-form-div">
        <h3 id="login-header">Login</h3><br /><br /><br />
        <label className="login-form-label" htmlFor="username">Username</label>
        <input className="login-user-input-field" type="text" name="username" ref={usernameField} required />
        <label className="login-form-label" htmlFor="password">Password</label>
        <input className="login-user-input-field" type="text" name="password" ref={passwordField} required /><br />
        <input id="login-form-sign-up" type="submit" value='Login' />
    </div>
</form>
  )
}
