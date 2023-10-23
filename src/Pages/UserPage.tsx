import { useContext } from "react"
import { UserContext } from "../Contexts/UserProvider"

export default function UserPage() {
  const { user } = useContext(UserContext);
  
  console.log("user from context:", user);
  console.log("localStorage username:", localStorage.getItem('username'));
  const username = localStorage.getItem('username')

  return (
    <>
      {username && <h3>{username}'s Page</h3>}
    </>
  );
}
