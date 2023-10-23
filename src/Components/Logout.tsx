import { useContext, useEffect } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Contexts/UserProvider"


export default function Logout() {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        localStorage.clear()
        setUser({username: '', token: ''})
        navigate('/')
      },[])
    
  return (
    <Spinner />
  )
}
