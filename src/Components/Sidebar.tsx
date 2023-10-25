import { Navbar } from 'react-bootstrap'
import Nav from 'react-bootstrap/esm/Nav'

export default function Sidebar() {

    const textStyle = { color: 'white', fontSize: '20px'}
    const sidebarStyle = {
        fontSize: '20px',
        alignItems: 'start',
        paddingLeft: '20px',
        maxWidth: '500px'
      };

  return (
    <Navbar style={sidebarStyle} sticky='top' className='flex-column sidebar'>
      <Nav.Item>
        <Nav.Link href="#bouldlytics" style={textStyle}>Bouldlytics</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#whatisbouldering" style={textStyle}>Bouldering</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#equipment" style={textStyle}>Equipment</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#anyonecanclimb" style={textStyle}>Who Can Climb?</Nav.Link>
      </Nav.Item>
    </Navbar>
  )
}
