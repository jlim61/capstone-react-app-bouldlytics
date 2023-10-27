import { Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <Row id='footer-row'>
        <Col className='foot-column'>
            © 2023 Bouldlytics
        </Col>
        <Col className='foot-column'>
            Powered by Coding Temple Knowledge
        </Col>
        <Col className='foot-column'>
            Joshua Lim 2023
        </Col>
    </Row>
  )
}
