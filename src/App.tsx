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
import MyDataPage from "./Pages/MyDataPage"
import HoldsContextProvider from "./Contexts/HoldsContextProvider"
import UserProfilePage from "./Pages/UserProfilePage"
import BoulderingInfoPage from "./Pages/BoulderingInfoPage"

function App(): JSX.Element {

  return (
    <>
    <BrowserRouter>
      <HoldsContextProvider>
      <Container fluid id="heading-container">
        <Heading />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/moonboard" element={<MoonboardPage />} />
        <Route path="/bouldering-info" element={<BoulderingInfoPage />} />
        <Route path="/my-data" element={<MyDataPage />} />
        <Route path="/user-profile/:username" element={<UserProfilePage />} />
        <Route path="/users" element={<SocialPage><Users /></SocialPage>} />
        <Route path="/register" element={<FormPage><RegisterForm /></FormPage>} />
        <Route path="/login" element={<FormPage><LoginForm /></FormPage>} />
        <Route path='/logout' element={<Logout />}/>
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
      </Container>
      </HoldsContextProvider>
    </BrowserRouter>
    </>
  )
}

export default App

// w9d3 01:03:53