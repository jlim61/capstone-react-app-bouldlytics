import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Container from "react-bootstrap/esm/Container"
import Heading from "./Components/Heading"
import FormPage from "./Pages/FormPage"
import HomePage from "./Pages/HomePage"

function App(): JSX.Element {

  return (
    <>
    <BrowserRouter>
      <Container fluid id="heading-container">
        <Heading />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<FormPage />} />
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
      </Container>
    </BrowserRouter>
    </>
  )
}

export default App

// w9d2full 01:30:35