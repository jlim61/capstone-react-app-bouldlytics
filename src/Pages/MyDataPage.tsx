import { useContext } from "react"
import { UserContext } from "../Contexts/UserProvider"
import { useParams } from "react-router-dom";

export default function MyDataPage() {
  const { user } = useContext(UserContext);
  const {username} = useParams()
  
  console.log("user from context:", user);
  console.log("localStorage username:", localStorage.getItem('username'));
  // const username1 = localStorage.getItem('username')

  return (
    <>
      {username && <h3>{username}'s Page</h3>}
    </>
  );
}
