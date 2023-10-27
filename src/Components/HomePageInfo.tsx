
import { useState } from 'react'
import { Col, Fade } from 'react-bootstrap'
import Row from 'react-bootstrap/esm/Row'

export default function HomePageInfo() {

  const [openData, setOpenData] = useState(false)
  const [openProgress, setOpenProgress] = useState(false)
  const [openGym, setOpenGym] = useState(false)

  return (
    <div>
    <Row id="homepage-row1">
      <Row>
        <div id="bouldlytics" className="card-header">What is Bouldlytics?</div>
      </Row>
      <Row>
        <div className="bouldlytics-body">Bouldlytics is your gateway to the exciting world of bouldering, offering a vibrant community for climbers of all levels. Our platform is a space where your climbing journey takes center stage, whether you're a novice or a seasoned pro. With Bouldlytics, you can create, share, and discover moonboard boulder routes, igniting your passion for climbing in new and exciting ways. Connect with fellow boulderers, follow their progress, and embark on a collective adventure of reaching new heights. But Bouldlytics is more than just a social platform; it's your climbing companion. Track your climbing data, from your average grade to the number of climbs conquered, and witness your growth unfold. And for those who crave structure, create personalized training programs, mark your achievements, and climb higher than ever before. Bouldlytics is your ultimate resource for bouldering, fostering a vibrant community and helping you reach your climbing goals.</div>
      </Row>
    </Row>
    <Row id='progress-row'>
      <Col>
      <button className='homepage-button' onClick={() => setOpenProgress(!openProgress)} aria-controls="data-info" aria-expanded={openProgress} >
          <img className='image-icon' src="progress-icon.png" alt="" />
        </button>
      </Col>
      <Col xs={8}>
      <Fade in={openProgress}>
          <div id="data-info" className=" progress-body">
          Bouldlytics empowers users with a comprehensive data tracking and analytics feature, enabling climbers to delve into the intricate details of their bouldering journey. Within the platform, users can effortlessly add their favorite boulders to their projects, serving as a personalized repository of their climbing adventures. This intuitive tool provides insights into their performance, offering valuable statistics such as the number of attempts made on each boulder. What truly sets Bouldlytics apart is the ability to set a completion status, allowing users to mark their conquests and achievements with ease. But it doesn't stop there; Bouldlytics provides a profound understanding of climbing prowess by showcasing an average grade scale for both the Fontainebleau and V scale systems, giving climbers a holistic view of their skill level. Climbers can track their highest grade climbed, a testament to their progression in the sport. Additionally, users can keep a watchful eye on their project completion rate, a motivating indicator of their commitment and growth in the world of bouldering. Bouldlytics brings climbing data to life, offering climbers a robust toolset to analyze and appreciate their bouldering journey.
          </div>
        </Fade>
      </Col>
    </Row>
    <Row id="data-row">
      <Col xs={8}>
      <Fade in={openData}>
          <div id="data-info" className=" data-body">
          Bouldlytics empowers users with a comprehensive data tracking and analytics feature, enabling climbers to delve into the intricate details of their bouldering journey. Within the platform, users can effortlessly add their favorite boulders to their projects, serving as a personalized repository of their climbing adventures. This intuitive tool provides insights into their performance, offering valuable statistics such as the number of attempts made on each boulder. What truly sets Bouldlytics apart is the ability to set a completion status, allowing users to mark their conquests and achievements with ease. But it doesn't stop there; Bouldlytics provides a profound understanding of climbing prowess by showcasing an average grade scale for both the Fontainebleau and V scale systems, giving climbers a holistic view of their skill level. Climbers can track their highest grade climbed, a testament to their progression in the sport. Additionally, users can keep a watchful eye on their project completion rate, a motivating indicator of their commitment and growth in the world of bouldering. Bouldlytics brings climbing data to life, offering climbers a robust toolset to analyze and appreciate their bouldering journey.
          </div>
        </Fade>
      </Col>
      <Col>
      <button className='homepage-button' onClick={() => setOpenData(!openData)} aria-controls="data-info" aria-expanded={openData} id="data-icon">
          <img className='image-icon data-icon' src="data-icon.png" alt="" />
        </button>
      </Col>
    </Row>
    <Row id="gym-row">
      <Col>
        <button className='homepage-button' onClick={() => setOpenGym(!openGym)} aria-controls="training-info" aria-expanded={openGym} id="gym-icon">
          <img id='image-icon' src="gym-icon.png" alt="" />
        </button>
      </Col>
      <Col xs={8}>
        <Fade in={openGym}>
            <div id="training-info" className=" gym-body">
            In the realm of bouldering, tracking progress is of paramount importance, and Bouldlytics excels in this domain. Climbers can leverage Bouldlytics to monitor their growth and celebrate their milestones. This feature serves as a dedicated portal for climbers to keep an eye on their evolving skills and accomplishments. Beyond just recording climbing data, Bouldlytics serves as a digital climbing journal, allowing users to set and conquer personal goals, both big and small. The platform acts as an encouraging companion for those navigating the bouldering world, letting them witness their incremental achievements. Whether you're a novice embarking on your first V0 ascent or a seasoned pro pushing the limits of your climbing prowess, Bouldlytics is there to celebrate each step forward. With a user-friendly interface, this progress tracking tool turns bouldering into a journey of self-discovery and improvement, making it more than just a sport, but a personal adventure that's worth celebrating. Bouldlytics is your companion in progress, there to inspire and applaud your climbing achievements every step of the way.
            </div>
          </Fade>
      </Col>
    </Row>
    </div>
  )
}
