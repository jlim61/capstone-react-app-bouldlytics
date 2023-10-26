import { Dropdown, Navbar } from 'react-bootstrap'

export default function Sidebar() {

    const buttonStyle = {
      background: '#ffffff',
      color: 'black',
      borderColor: 'black'
    }
    const sidebarStyle = {
        fontSize: '20px',
        alignItems: 'start',
        paddingLeft: '20px',
        maxWidth: '500px'
      };

  return (
    <Navbar style={sidebarStyle} sticky='top' className='flex-column sidebar'>
    <Dropdown>
      <Dropdown.Toggle style={buttonStyle} id="dropdown-basic">
        Bouldering Topics
      </Dropdown.Toggle>

      <Dropdown.Menu style={buttonStyle}>
        <Dropdown.Item href="#whatisbouldering">Bouldering</Dropdown.Item>
        <Dropdown.Item href="#equipment">Equipment</Dropdown.Item>
        <Dropdown.Item href="#anyonecanclimb">Who Can Climb?</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </Navbar>
  )
}
