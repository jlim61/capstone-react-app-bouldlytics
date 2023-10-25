
export default function MyDataPage() {

  const username = localStorage.getItem('username')

  return (
    <>
      {username && <h3>{username}'s Page</h3>}
    </>
  );
}
