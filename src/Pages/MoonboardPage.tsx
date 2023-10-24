import { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Button, ButtonGroup, Col, Row, ToggleButton } from "react-bootstrap";
import { MoonboardBoulder } from "../types";
import MoonboardImage from "../Components/MoonboardImage";
import { HoldsContext } from "../Contexts/HoldsContextProvider";
import { Link, useNavigate } from "react-router-dom";


export default function MoonboardPage() {

    const navigate = useNavigate()

    const [moonboardBoulders, setMoonboardBoulders] = useState<Array<Partial<MoonboardBoulder>>>([])

    const { holds, setHolds } = useContext(HoldsContext)
    const [holdRadioValue, setHoldRadioValue] = useState('1')
    
    const holdRadios = [
      { name: 'Starting Hold(s)', value: '1' },
      { name: 'Usable Holds', value: '2' },
      { name: 'Finish Hold(s)', value: '3' },
    ]

    const boulderNameField = useRef<HTMLInputElement>(null)
    const gradeField = useRef<HTMLInputElement>(null)
    const startingHoldsField = useRef<HTMLInputElement>(null)
    const usableHoldsField = useRef<HTMLInputElement>(null)
    const finishHoldsField = useRef<HTMLInputElement>(null)
    const mbConfigField = useRef<HTMLInputElement>(null)

    async function handleBoulderData(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      
      const boulder = {
        boulder_name: boulderNameField.current!.value,
        grade: gradeField.current!.value,
        starting_hold: holds.starting_holds,
        usable_holds: holds.usable_holds,
        finish_hold: holds.finish_holds,
        moonboard_configuration: mbConfigField.current!.value
      }
      console.log("Boulder data:", boulder)
      clearFormData() // reset values on input fields to blank
      await createBoulder(boulder)
    }

    function clearFormData() {
      boulderNameField.current!.value = ''
      gradeField.current!.value = ''
      startingHoldsField.current!.value = ''
      usableHoldsField.current!.value = ''
      finishHoldsField.current!.value = ''
      mbConfigField.current!.value = ''
    }

    async function createBoulder(boulder: MoonboardBoulder){
      console.log('create boulder function')
      const res = await fetch('https://bouldering-capstone.onrender.com/moonboard_boulder', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(boulder)
      })
      const data = await res.json()
      console.log(data)
      if (res.ok){
        navigate('/moonboard')
      } else window.alert('Error Creating Boulder')
    }


    useEffect(() => {
        getMoonboardBoulders()
    }, [])

    const accessToken = localStorage.getItem('token')

    // getting all moonboard boulders
    async function getMoonboardBoulders() {
        const res = await fetch('https://bouldering-capstone.onrender.com/moonboard_boulder',{
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'}
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            setMoonboardBoulders(data)
        } else {
            window.alert('Request Failed')
        }
    }


    // format holds
    function formatHolds(holds: string[]) {
        return holds.join(", ");
      }

      function projectBoulder(){}

      return (
        <div>
        <Container id="moonboard-background">
          <div id="moonboard-aligner">
          { localStorage.getItem('setter') === 'true' ?
            <div id="moonboard-input-fields-container">
              <ButtonGroup id="hold-radio-buttons">
                <ToggleButton
                  key={0}
                  id="radio-0"
                  type="radio"
                  variant="outline-success"
                  name="radio"
                  value="1"
                  checked={holdRadioValue === "1"}
                  onChange={(e) => setHoldRadioValue(e.currentTarget.value)}
                >
                  Starting Hold(s)
                </ToggleButton>
                <ToggleButton
                  key={1}
                  id="radio-1"
                  type="radio"
                  variant="outline-info"
                  name="radio"
                  value="2"
                  checked={holdRadioValue === "2"}
                  onChange={(e) => setHoldRadioValue(e.currentTarget.value)}
                >
                  Usable Holds
                </ToggleButton>
                <ToggleButton
                  key={2}
                  id="radio-2"
                  type="radio"
                  variant="outline-danger"
                  name="radio"
                  value="3"
                  checked={holdRadioValue === "3"}
                  onChange={(e) => setHoldRadioValue(e.currentTarget.value)}
                >
                  Finish Hold(s)
                </ToggleButton>
              </ButtonGroup>
              <form id="moonboard-input-fields-container" action="" onSubmit={handleBoulderData} >
                <label htmlFor="">Boulder Name</label>
                <input type="text" ref={boulderNameField}/><br />
                <label htmlFor="">Grade</label>
                <input type="text" ref={gradeField}/><br />
                <label htmlFor="">Starting Hold(s)</label>
                <input type="text" ref={startingHoldsField} value={holds.starting_holds} /><br />
                <label htmlFor="">Usable Holds</label>
                <input type="text" ref={usableHoldsField} value={holds.usable_holds} /><br />
                <label htmlFor="">Finish Hold(s)</label>
                <input type="text" ref={finishHoldsField} value={holds.finish_holds} /><br />
                <label htmlFor="">MoonBoard Configuration</label>
                <input type="text" ref={mbConfigField} /><br /><br />
                <input type="submit" value='Create Boulder' />
              </form>
            </div> : <></>}
            <MoonboardImage holdRadioValue={holdRadioValue} />
          </div>
          <Row id='moonboard-info'>
            <Col className="moonboard-column">
              <strong>Boulder Name</strong>
            </Col>
            <Col className="moonboard-column">
              <strong>Grade</strong>
            </Col>
            <Col className="moonboard-column">
              <strong>Starting Hold(s)</strong>
            </Col>
            <Col className="moonboard-column">
              <strong>Usable Holds</strong>
            </Col>
            <Col className="moonboard-column">
              <strong>Finish Hold(s)</strong>
            </Col>
            <Col className="moonboard-column">
              <strong>Setter</strong>
            </Col>
            <Col className="moonboard-column">
              <strong>Moonboard Configuration</strong>
            </Col>
            <Col className="moonboard-column">
              <strong>Project This Boulder</strong>
            </Col>
          </Row>
          <div id="all-moonboard-boulders-div">
            {moonboardBoulders.map((boulder: Partial<MoonboardBoulder>) => (
                <Row key={boulder.id}>
                    <Col className="moonboard-column">
                        {boulder.boulder_name}
                    </Col>
                    <Col className="moonboard-column">
                        {boulder.grade}
                    </Col>
                    <Col className="moonboard-column">
                        {formatHolds(boulder.starting_hold!)}
                    </Col>
                    <Col className="moonboard-column">
                        {formatHolds(boulder.usable_holds!)}
                    </Col>
                    <Col className="moonboard-column">
                    {formatHolds(boulder.finish_hold!)}
                    </Col>
                    <Col className="moonboard-column">
                    <Link className="username-link" to={`/my-data/${boulder.setters.username}`}>{boulder.setters.username}</Link>
                    </Col>
                    <Col className="moonboard-column">
                        {boulder.moonboard_configuration}
                    </Col>
                    <Col className="moonboard-column">
                {localStorage.getItem('token') && (
                  <Button className='project-boulder-follow-button' onClick={projectBoulder}>Project</Button>
                )}
              </Col>
                </Row>
            ))}
          </div>
        </Container>
        </div>
      )
}
