import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Container from "react-bootstrap/esm/Container"
import Heading from "./Components/Heading"
import FormPage from "./Pages/FormPage"
import HomePage from "./Pages/HomePage"
import RegisterForm from "./Components/Forms/RegisterForm"
import LoginForm from "./Components/Forms/LoginForm"
import Logout from "./Components/Logout"
import SocialPage from "./Pages/SocialPage"
import Users from "./Components/Users"
import MoonboardPage from "./Pages/MoonboardPage"
import UserPage from "./Pages/UserPage"

function App(): JSX.Element {

  return (
    <>
    <BrowserRouter>
      <Container fluid id="heading-container">
        <Heading />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/moonboard" element={<MoonboardPage />} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/users" element={<SocialPage><Users /></SocialPage>} />
        <Route path="/register" element={<FormPage><RegisterForm /></FormPage>} />
        <Route path="/login" element={<FormPage><LoginForm /></FormPage>} />
        <Route path='/logout' element={<Logout />}/>
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
      </Container>
    </BrowserRouter>
    </>
  )
}

export default App

// w9d3 01:03:53