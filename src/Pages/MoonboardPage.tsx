import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import { MoonboardBoulder } from "../types";


export default function MoonboardPage() {

    const [moonboardBoulders, setMoonboardBoulders] = useState<Array<Partial<MoonboardBoulder>>>([])

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

    // onClick to activate borders around holds

    const [isCircleActive, setIsCircleActive] = useState(false);
    
    const toggleCircle = () => {
        setIsCircleActive((prevIsCircleActive: boolean) => !prevIsCircleActive);
    };

    const circleStyle = {
        border: isCircleActive ? "4px solid green" : "none",
      }

      return (
        <div>
        <Container id="moonboard-background">
          <div id="moonboard-aligner">
            <div id="moonboard-input-fields-container">
              <label htmlFor="">Boulder Name</label>
              <input type="text" /><br />
              <label htmlFor="">Grade</label>
              <input type="text" /><br />
              <label htmlFor="">Starting Hold(s)</label>
              <input type="text" /><br />
              <label htmlFor="">Usable Hold(s)</label>
              <input type="text" /><br />
              <label htmlFor="">Finish Hold(s)</label>
              <input type="text" /><br />
              <label htmlFor="">MoonBoard Configuration</label>
              <input type="text" /><br /><br />
              <input type="submit" value='Create Boulder' />
            </div>
            <div id="moonboard-div-image">
              <div id="A18" style={circleStyle} onClick={toggleCircle}></div>
            </div>
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
              <strong>Moonboard Configuration</strong>
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
                    <Col className="moonboard-config-column moonboard-column">
                        {boulder.moonboard_configuration}
                    </Col>
                </Row>
            ))}
          </div>
        </Container>
        </div>
      )
}
