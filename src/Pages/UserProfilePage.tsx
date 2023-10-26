
import { useParams } from "react-router-dom";

export default function UserProfilePage() {
  // const { user } = useContext(UserContext);
  const {username} = useParams()

  // const username1 = localStorage.getItem('username')

  return (
    <>
      {username && <h3>{username}'s Page</h3>}
    </>
  );
}
