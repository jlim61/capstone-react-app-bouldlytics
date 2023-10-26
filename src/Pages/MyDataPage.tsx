import { useEffect, useRef, useState } from "react"
import { BoulderProject } from "../types"
import { Button, Col, Row } from "react-bootstrap"

export default function MyDataPage() {

  const [renderTrigger, setRenderTrigger] = useState(false);
  const username = localStorage.getItem('username')
  const accessToken = localStorage.getItem('token')
  const [userData, setUserData] = useState<Array<Partial<BoulderProject>>>([])
  const [completedBoulders, setCompletedBoulders] = useState(0);
  const [outstandingProjects, setOutstandingProjects] = useState(0);
  const [boulderProjectGrades, setBoulderProjectGrades] = useState([])
  const [avgGrade, setAvgGrade] = useState("")
  const [highestGrade, setHighestGrade] = useState("")

  const attemptsValueField = useRef<HTMLInputElement>(null)

  async function getUserInfo(){
    const res = await fetch(`https://bouldering-capstone.onrender.com/user/${username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
     }
    })
    if (res.ok) {
      const data = await res.json()
      const completedBouldersCount = data.moonboard_info.filter((boulder) => boulder.completed).length
      const outstandingProjectsCount = data.moonboard_info.filter((boulder) => !boulder.completed).length
      setCompletedBoulders(completedBouldersCount);
      setOutstandingProjects(outstandingProjectsCount);
      setUserData(data)
      console.log(data)
    } else console.log('fetch was unsuccessful')
  }
  // console.log(userData)

  function getAllProjectGrades() {
    if (userData.moonboard_info && userData.moonboard_info.length > 0) {
      const grades = userData.moonboard_info.map((boulder) => boulder.boulder_info.grade);
      // console.log(grades, 'from getAllProjectGrades')
      setBoulderProjectGrades(grades);
      // console.log(boulderProjectGrades, 'console logging boulderProjectGrades')
    }
  }
  

  const gradeMap = {
    "3/VB": 1,
    "4/V0": 2,
    "5/V1": 2,
    "5+/V2": 3,
    "6A/V3": 4,
    "6A+/V4": 4,
    "6B/V4": 5,
    "6B+/V5": 5,
    "6C/V5": 6,
    "6C+/V5": 6,
    "7A/V6": 7,
    "7A+/V7": 8,
    "7B/V8": 9,
    "7B+/V8": 9,
    "7C/V9": 10,
    "7C+/V10": 11,
    "8A/V11": 12,
    "8A+/V12": 13,
    "8B/V13": 14,
    "8B+/V14": 15,
    "8C/V15": 16,
    "8C+/V16": 17,
    "9A/V17": 18,
  }
  
  const finalGrade = {
    1: "3/VB",
    2: "4/V0 to 5/V1",
    3: "5+/V2",
    4: "6A/V3 to 6A+/V4",
    5: "6B/V4 to 6B+/V5",
    6: "6C/V5 to 6C+/V5",
    7: "7A/V6",
    8: "7A+/V7",
    9: "7B/V8 to 7B+/V8",
    10: "7C/V9",
    11: "7C+/V10",
    12: "8A/V11",
    13: "8A+/V12",
    14: "8B/V13",
    15: "8B+/V14",
    16: "8C/V15",
    17: "8C+/V16",
    18: "9A/V17",
  };

  function calculateAverageGrade(){
    if (boulderProjectGrades.length === 0) {
      setAvgGrade('No boulders completed')
      // console.log(avgGrade, 'console log of avgGrade')
    }

    let totalGradePoints = 0

    boulderProjectGrades.forEach((grade) => {
      // console.log(grade, 'grade from userData')
      totalGradePoints += gradeMap[grade]
      // console.log(totalGradePoints, 'total grade points adding based on key')
    })

    const avgerageGradeValue = totalGradePoints / boulderProjectGrades.length
    // console.log(avgerageGradeValue, 'average grade value')

    for (const key in finalGrade){
      if (key == avgerageGradeValue){
        // console.log(finalGrade[avgerageGradeValue])
        setAvgGrade(finalGrade[avgerageGradeValue])
      }
    } // console.log(avgGrade, 'console log of avgGrade from calc average grade function')
  }

  function findHighestGrade(){
    let tempHighGrade = 0
    let bestMatch = null

    if (boulderProjectGrades.length === 0) {
      setAvgGrade('No boulders completed')
    }

    boulderProjectGrades.forEach((grade)=>{
      // console.log(grade, 'from find highest grade')
      for (const key in gradeMap){
        if (key == grade) {
          // console.log(key, grade, 'values the same')
          if (tempHighGrade < gradeMap[grade]) {
            tempHighGrade = gradeMap[grade]
            bestMatch = key
            // console.log( tempHighGrade, bestMatch, grade, gradeMap[grade], 'update tempHighGrade')
          }
        }
      }
    })
    if (bestMatch) {
      setHighestGrade(bestMatch)
      // console.log(highestGrade, 'highest grade from find highest grade func')
    }
  }

  useEffect(() => {
    getUserInfo()
    getAllProjectGrades()
    calculateAverageGrade()
    findHighestGrade()

    setRenderTrigger(false)
  }, [renderTrigger])

  useEffect(() => {
    getAllProjectGrades();
  }, [userData])

  useEffect(() => {
    calculateAverageGrade();
  }, [boulderProjectGrades])

  useEffect(() => {
    findHighestGrade();
  }, [boulderProjectGrades])


  function followUser() {}

  // function completeBoulder() {}

  // function stopProjectingBoulder() {}

  async function incrementAttempts(boulderID, attempts) {
    const amount = attempts + 1
    const res = await fetch(`https://bouldering-capstone.onrender.com/project/attempts/${boulderID}/${amount}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      setRenderTrigger(true)
      console.log('Attempts successfully incremented')
    } else window.alert('Increment Failed')
  }

  async function adjustAttemptsByValue(boulderID){
    const amount = attemptsValueField.current?.value
    if (!isNaN(amount)) {
      attemptsValueField.current!.value = ''
      const res = await fetch(`https://bouldering-capstone.onrender.com/project/attempts/${boulderID}/${amount}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        setRenderTrigger(true);
        console.log('Attempts successfully adjusted');
      } else {
        window.alert('Adjustment Failed');
      }
    }


  }


  async function removeProject(){
    console.log('test connection')
  }




  return (
    <Row id="user-info-container">
      <Col xs={5}>
        <Col id='box1'>
          <img src="profile-image-1.jpg" alt="" />
          {username && <h3>{username}</h3>}
          {localStorage.getItem('token') && (
                  <Button className='project-boulder-follow-button' onClick={followUser}>Follow</Button>
                )}
        </Col>
        <Col id="box2">
          <p>My Boulders</p>
          {userData.moonboard_boulders &&
            userData.moonboard_boulders.length > 0 ? (
              userData.moonboard_boulders.map((boulder, index) => (
                <div className="boulder-entry" key={index}>
                  <Row>
                    <Col>
                      <p>Boulder Name: {boulder.boulder_name || 'N/A'}</p>
                    </Col>
                    <Col>
                      <p>Grade: {boulder.grade || 'N/A'}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col><p>Starting Hold: {boulder.starting_hold || 'N/A'}</p></Col>
                    <Col><p>Usable Holds: {boulder.usable_holds ? boulder.usable_holds.join(', ') : 'N/A'}</p></Col>
                    <Col><p>Finish Holds: {boulder.finish_hold ? boulder.finish_hold.join(', ') : 'N/A'}</p></Col>
                  </Row>
                  <p>Moonboard Configuration: {boulder.moonboard_configuration || 'N/A'}</p>
                  <button>Delete Boulder</button>
                </div>
              ))
            ) : (
              <p>No boulders found</p>
            )}
        </Col>
      </Col>
      <Col xs={7}>
        <Row>
          <Col id='box3'>
            <Row className="user-average-stats-row">
              <Col>Boulders Completed:</Col>
              <Col className='average-climbing-data'>{completedBoulders}</Col>
            </Row>
            <Row className="user-average-stats-row">
              <Col>Average Grade:</Col>
              <Col className='average-climbing-data'>{avgGrade}</Col>
            </Row>
            <Row className="user-average-stats-row">
              <Col>Highest Grade:</Col>
              <Col className='average-climbing-data'>{highestGrade}</Col>
            </Row>
            <Row className="user-average-stats-row">
              <Col>Outstanding Projects:</Col>
              <Col className='average-climbing-data'>{outstandingProjects}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
        <Col id='box4'>
          <p>Completed Projects</p>
          {userData.moonboard_info &&
            userData.moonboard_info.length > 0 && (
              userData.moonboard_info
                .filter((boulder) => boulder.completed) // Filter completed projects
                .map((boulder, index) => (
                  <div className="project-entry" key={index}>
                    <Row className="project-row">
                      <Col>
                        <p>Boulder Name: {boulder.boulder_info.boulder_name}</p>
                      </Col>
                      <Col>
                        <p className="project-grade">Grade: {boulder.boulder_info.grade}</p>
                      </Col>
                    </Row>
                    <Row className="project-row">
                      <Col>
                        <p>Attempts: {boulder.attempts}</p>
                      </Col>
                      <Col>
                        <p>Status: Completed</p>
                      </Col>
                    </Row>
                    <button onClick={()=>{removeProject()}} >Remove From Projects</button>
                  </div>
                ))
            )}
        </Col>
        <Col id='box5'>
          <p>Pending Projects</p>
          {userData.moonboard_info &&
          userData.moonboard_info.length > 0 && (
            userData.moonboard_info
              .filter((boulder) => !boulder.completed)
              .map((boulder, index) => (
                <div className="project-entry" key={index}>
                  <Row className="project-row">
                    <Col>
                      <p>Boulder Name: {boulder.boulder_info.boulder_name}</p>
                    </Col>
                    <Col>
                      <p className="project-grade">Grade: {boulder.boulder_info.grade}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>Attempts: {boulder.attempts}</p>
                    </Col>
                    <Col xs={8}>
                      <button className="attemtps-plus1" onClick={() => incrementAttempts(boulder.id, boulder.attempts)}>+1</button>
                      <input ref={attemptsValueField} className="attempts-adjust-input" type="text" />
                      <button onClick={() => adjustAttemptsByValue(boulder.id)}>Set by Value</button>
                    </Col>
                  </Row>
                </div>
              ))
          )}
        </Col>
        </Row>
      </Col>
    </Row>
  );
}
