import { Accordion, Col, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Sidebar from "../Components/Sidebar";


export default function BoulderingInfo() {
  return (
    <>
  <Row>
    <Col id="sidebar-col" ><Sidebar /></Col>
    <Col xs={11}>
    <div id="bouldering-info">
      <Row id="bouldering-info-row2">
        <Col>
          <Carousel fade className="wib-image" interval={3000} controls={false} indicators={false}>
            <Carousel.Item>
              <img
                src="wib1.jpg"
                alt="First slide"
                className="d-block w-100 wib-image"
              />
            </Carousel.Item>
            <Carousel.Item >
              <img
                src="wib4.jpg"
                alt="Third slide"
                className="d-block w-100 wib-image"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="wib2.jpg"
                alt="Second slide"
                className="d-block w-100 wib-image"
              />
            </Carousel.Item>
            <Carousel.Item >
              <img
                src="wib3.jpg"
                alt="Third slide"
                className="d-block w-100 wib-image"
              />
            </Carousel.Item>
            <Carousel.Item >
              <img
                src="wib6.webp"
                alt="Third slide"
                className="d-block w-100 wib-image"
              />
            </Carousel.Item>
            <Carousel.Item >
              <img
                src="wib5.jpg"
                alt="Third slide"
                className="d-block w-100 wib-image"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col xs={7}>
        <div id="card1">
          <div id="whatisbouldering" className="card-header">What is Bouldering?</div>
          <div className="card-body">Bouldering is the electrifying art of defying gravity, where climbers become human acrobats on a canvas of rugged rock. Imagine yourself perched at the base of a colossal boulder, surrounded by the untamed wilderness, and your only mission is to conquer the unforgiving puzzle nature has laid before you. With each move, you harness your strength, agility, and mental prowess, taking on the challenge with unyielding determination. Your fingers cling to tiny holds, and your body dances gracefully along the contours of the rock, defying the laws of physics.
            <br /><br />This thrilling discipline of climbing offers a pure, unadulterated connection with the stone itself, no ropes, no harnesses, just you versus the raw, unyielding rock. It's a journey that's equal parts adrenaline and serenity, a physical and mental endeavor that pushes you to the limits of your capabilities. Bouldering transcends the ordinary and unveils a world where each ascent is a masterpiece of strength, technique, and personal growth. So, if you're seeking an adventure that fuses the beauty of nature with the thrill of physical challenge, bouldering is your gateway to a world where the impossible becomes possible, and the rocks themselves invite you to ascend to new heights.
          </div>
        </div>
        </Col>
      </Row>
      <Row id="bouldering-info-row3">
        <Col id="align-equipment-text">
          <div>
            <div id="equipment" className="card-header">Equipment: Climbing Essentials for Every Boulderer</div>
            <div className="card-body">
              While having the right bouldering gear enhances your climbing experience, it's worth noting that it's not always a mandatory prerequisite. This is especially true when you're starting your bouldering journey, whether indoors or outdoors. Many indoor bouldering gyms conveniently offer rental equipment, including climbing shoes and crash pads. This accessibility makes it easy for newcomers to try out bouldering without a substantial upfront investment. However, as you progress and find your passion for the sport deepening, acquiring your gear, including climbing shoes and a crash pad, becomes a valuable step. These essential tools not only provide a personalized and comfortable climbing experience but also contribute to your safety and climbing proficiency. So, while bouldering gear isn't an absolute necessity for beginners, it gradually becomes an indispensable part of your climbing journey as you explore the vertical world.
            </div>
          </div>
        </Col>
        <Col id="accordion-column" xs={5}>
        <Accordion id="equipment-accordion" defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Climbing Shoes</Accordion.Header>
            <Accordion.Body>
            Climbing shoes are specialized footwear engineered for the specific demands of rock climbing. They offer the following key features: <br /><br />
            <strong>Snug Fit:</strong> Climbing shoes have a tight, form-fitting design that minimizes dead space inside the shoe, ensuring precise foot placement on holds.<br />
            <strong>Sticky Rubber Soles:</strong> The rubber soles of climbing shoes provide exceptional friction on rock surfaces, ensuring a secure grip on holds.<br />
            <strong>Sensitivity:</strong> Climbing shoes offer enhanced sensitivity, allowing climbers to feel the rock and make precise adjustments.<br />
            <strong>Performance-Oriented:</strong> These shoes are optimized for performance, promoting precise footwork and balance during climbs.<br />
            <strong>Safety:</strong> Climbing shoes reduce the risk of slipping, contributing to a climber's safety on the wall.<br />
            <strong>Variety of Models:</strong> Climbing shoes come in various models, each suited to different climbing styles and preferences, making it possible to choose the right shoe for the task.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Chalk and Chalk Bag</Accordion.Header>
            <Accordion.Body>
              <strong>Chalk:</strong> Chalk is used in bouldering to keep hands dry by absorbing moisture and sweat. Dry hands provide better grip on holds, reducing the chances of slipping and enhancing overall control.<br />
              <strong>Chalk Bag:</strong> A chalk bag is a pouch worn around the waist or attached to a climbing harness. It allows climbers to carry and access chalk easily during climbs, ensuring continuous hand dryness and grip maintenance.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Crash Pad</Accordion.Header>
            <Accordion.Body>
              Crash pads are crucial safety tools in bouldering, featuring:<br /><br />
              <strong>Cushioned Landings:</strong> Designed to reduce the impact and risk of injury during falls by providing a cushioned landing surface.<br />
              <strong>Portability:</strong> Equipped with carrying straps, crash pads are highly portable, facilitating easy transportation to outdoor bouldering spots or within indoor climbing gyms.<br />
              <strong>Safety:</strong> In outdoor bouldering, crash pads create stable and protective landing zones, particularly on uneven or rocky terrains.<br />
              <strong>Multipurpose Use:</strong> Climbers often use multiple crash pads to establish larger and safer landing areas, especially for highball problems or in complex terrains.<br />
              <strong>Indoor Availability:</strong> Indoor climbing gyms typically provide their crash pads for climbers to use, offering an added layer of convenience and safety.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Brush</Accordion.Header>
            <Accordion.Body>
              Climbing brushes serve a critical function in bouldering, featuring:<br /><br />
              <strong>Enhanced Grip:</strong> By effectively cleaning climbing holds, brushes prevent chalk buildup and dirt accumulation. This maintenance ensures optimal grip, aiding climbers in securely clinging to holds and reducing the chances of slipping.<br />
              <strong>Confidence Booster:</strong> Clean holds instill confidence in climbers, allowing them to tackle routes and problems with assurance, knowing that their holds are free from excess chalk and slippery residue.<br />
              <strong>Portability and Accessibility:</strong> Climbing brushes are compact and portable, ensuring climbers can easily carry them to the gym or crag. They are readily accessible, offering a convenient solution for maintaining the quality and safety of holds.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Finger Tape (Optional)</Accordion.Header>
            <Accordion.Body>
            Finger tape serves as an indispensable climbing aid, offering climbers several key advantages:<br /><br />
            <strong>Finger Support:</strong> Finger tape is used to provide support and protection to the fingers, making it easier for climbers to hold onto small holds and crimps without straining their tendons or joints.<br />
            <strong>Injury Prevention:</strong> It plays a crucial role in preventing finger injuries, particularly in situations where holds exert significant pressure on the fingers, minimizing the risk of sprains and strains.<br />
            <strong>Reduced Discomfort:</strong> When used properly, finger tape minimizes the discomfort associated with repetitive holds and crimps, enhancing the climbing experience.<br />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </Col>
      </Row>
      <Row id="bouldering-info-row4">
        <Row id="wcb">
          <img src="wcb2.jpg" alt="" />
        </Row>
        <Row>
          <div id="anyonecanclimb" className="card-header">Anyone Can Climb</div>
          <div className="card-body">Bouldering is a sport that knows no bounds when it comes to who can participate. It's a thrilling and inclusive activity suitable for a wide range of individuals, from children taking their first steps on the climbing wall to seasoned climbers well into their golden years. The beauty of bouldering lies in its adaptability, allowing anyone, regardless of age or fitness level, to partake in the excitement of conquering rock walls. Whether you're a young adventurer, a parent sharing quality time with your kids, or a retiree seeking a new passion, bouldering welcomes all. It's not about age; it's about the joy of defying gravity, pushing personal limits, and connecting with a vibrant climbing community. So, the next time you wonder, 'Who can boulder?' – remember, the answer is simple: anyone and everyone.</div>
        </Row>
      </Row>
    </div>
    </Col>
  </Row>
    

    </>
  )
}
