import { useEffect, useRef, useState } from "react"
import { BoulderProject } from "../types"
import { Button, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

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
  const [projectCompletion, setProjectCompletion] = useState()
  

  const attemptsValueField = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

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
      setRenderTrigger(true)
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
    } 
    setRenderTrigger(true)
    // console.log(avgGrade, 'console log of avgGrade from calc average grade function')
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
    }setRenderTrigger(true)
  }

  function findProjectCompletionPercent(){
    let pendingProjects = 0
    let completedProject = 0

    if (userData.moonboard_info && userData.moonboard_info.length > 0) {
      userData.moonboard_info.forEach((boulder) => {
        if (boulder.completed) {
          completedProject++;
        } else {
          pendingProjects++;
        }
      });
    }
    const totalProjects = completedProject + pendingProjects
    const completionPercentage = totalProjects > 0 ? ((completedProject / totalProjects) * 100).toFixed(2) : 0
    setProjectCompletion(completionPercentage)
    document.documentElement.style.setProperty('--completion', `${completionPercentage}%`);
    setRenderTrigger(true)
    console.log(projectCompletion);
  }
  
  useEffect(() => {
    getUserInfo()
    getAllProjectGrades()
    calculateAverageGrade()
    findHighestGrade()
    findProjectCompletionPercent()

    setRenderTrigger(true)
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


  async function deleteUser() {
    const userID = localStorage.getItem('id')
    const res = await fetch(`https://bouldering-capstone.onrender.com/user/${userID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('Response status:', res.status);
    console.log('Response data:', await res.text());
    console.log('fetch')
    if (res.ok) {
      localStorage.clear()
      navigate('/')
      console.log('user deleted')
    } else window.alert('Failed to delete account')
  }

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
      setRenderTrigger(false)
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
        setRenderTrigger(false)
        console.log('Attempts successfully adjusted');
      } else {
        window.alert('Adjustment Failed');
      }
    }
  }


  async function removeProject(boulderID){
    const res = await fetch(`https://bouldering-capstone.onrender.com/user/project/${boulderID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      setRenderTrigger(false)
      console.log('projected boulder successfully removed')
    } else window.alert('Failed to remove projected boulder')
  }

  async function completeProject(boulderID) {
    const res = await fetch(`https://bouldering-capstone.onrender.com/project/completed/${boulderID}/true`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      setRenderTrigger(false)
      console.log('Project completed')
    } else window.alert('Issue With Complete')
  }

  async function deleteBoulder(boulderID) {
    const res = await fetch(`https://bouldering-capstone.onrender.com/moonboard_boulder/${boulderID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      setRenderTrigger(false)
      console.log('boulder successfully removed')
    } else window.alert('Boulder Removal Failed')
  }

  return (
    <Row id="user-info-container">
      <Col className='profile-content' xs={4}>
        <Col id='box1'>
          <img className="profile-picture" src="/profile-image-1.jpg" alt="" />
          {username && <h3>{username}</h3>}
          {localStorage.getItem('token') && (
                  <Button className='project-boulder-follow-button' onClick={deleteUser}>Delete Account</Button>
                )}
        </Col>
        <Col id="box2">
          <p id="user-profile-boulders-tag">My Boulders</p>
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
                  {localStorage.getItem('id') == boulder.setter_id && (
                    <button className="delete-boulder-button" onClick={()=>{deleteBoulder(boulder.id)}}>Delete Boulder</button>
                  )}
                </div>
              ))
            ) : (
              <p>No boulders found</p>
            )}
        </Col>
      </Col>
      <Col xs={7}>
        <Row id='box3'>
            <Row>
              <Col xs={3} className="average-climbing-stats">
                <p>Boulders Completed:</p>
                <p>Average Grade:</p>
                <p>Highest Grade:</p>
                <p>Outstanding Projects:</p>
              </Col>
              <Col className="average-climbing-stats">
                <p>{completedBoulders}</p>
                <p>{avgGrade}</p>
                <p>{highestGrade}</p>
                <p>{outstandingProjects}</p>
              </Col>
              <Col id="progress-circle-container" xs={6}>
              <p id="progress-label">Project Progress:</p>
              <div className="progress-circle">
                <svg width="100" height="100">
                  {projectCompletion <= 15 ? (
                    <circle
                      className="circle red"
                      r="45"
                      cx="50"
                      cy="50"
                      strokeDasharray="283"
                      strokeDashoffset={`calc(283 - (projectCompletion * 283 / 100))`}
                    ></circle>
                  ) : projectCompletion <= 35 ? (
                    <circle
                      className="circle pinkish-red"
                      r="45"
                      cx="50"
                      cy="50"
                      strokeDasharray="283"
                      strokeDashoffset={`calc(283 - (projectCompletion * 283 / 100))`}
                    ></circle>
                  ) : projectCompletion <= 50 ? (
                    <circle
                      className="circle orangish-yellow"
                      r="45"
                      cx="50"
                      cy="50"
                      strokeDasharray="283"
                      strokeDashoffset={`calc(283 - (projectCompletion * 283 / 100))`}
                    ></circle>
                  ) : projectCompletion <= 75 ? (
                    <circle
                      className="circle yellowish-lime-green"
                      r="45"
                      cx="50"
                      cy="50"
                      strokeDasharray="283"
                      strokeDashoffset={`calc(283 - (projectCompletion * 283 / 100))`}
                    ></circle>
                  ) : (
                    <circle
                      className="circle green"
                      r="45"
                      cx="50"
                      cy="50"
                      strokeDasharray="283"
                      strokeDashoffset={`calc(283 - (projectCompletion * 283 / 100))`}
                    ></circle>
                  )}
                  <text x="50%" y="50%" className="percentage">
                    {projectCompletion}%
                  </text>
                </svg>
              </div>
              </Col>
            </Row>
        </Row>
        <Row>
        <Col id='box4'>
          <p id="completed-projects-tag">Completed Projects</p>
          {userData.moonboard_info &&
            userData.moonboard_info.length > 0 && (
              userData.moonboard_info
                .filter((boulder) => boulder.completed) // Filter completed projects
                .map((boulder, index) => (
                  <div className="project-entry" key={index}>
                    <Row className="project-row">
                      <Col>
                        <p className="project-text">Boulder Name: {boulder.boulder_info.boulder_name}</p>
                      </Col>
                      <Col xs={4}>
                        <p className="project-grade project-text">Grade: {boulder.boulder_info.grade}</p>
                      </Col>
                    </Row>
                    <Row className="project-row">
                      <Col>
                        <p  className="project-text">Attempts: {boulder.attempts}</p>
                      </Col>
                      <Col xs={4}>
                        <p  className="project-text">Status: Completed</p>
                      </Col>
                    </Row>
                    {localStorage.getItem('id') == boulder.user_id && (
                      <button className="remove-project-button" onClick={()=>{removeProject(boulder.id)}} >Remove From Projects</button>
                    )}
                  </div>
                ))
            )}
        </Col>
        <Col id='box5'>
          <p id="pending-projects-tag">Pending Projects</p>
          {userData.moonboard_info &&
          userData.moonboard_info.length > 0 && (
            userData.moonboard_info
              .filter((boulder) => !boulder.completed)
              .map((boulder, index) => (
                <div className="project-entry" key={index}>
                  <Row className="project-row">
                    <Col>
                      <p className="project-text">Boulder Name: {boulder.boulder_info.boulder_name}</p>
                    </Col>
                    <Col xs={4}>
                      <p className="project-grade project-text">Grade: {boulder.boulder_info.grade}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="project-text">Attempts: {boulder.attempts}</p>
                    </Col>
                    {localStorage.getItem('id') == boulder.user_id && (
                      <Col xs={8}>
                        <button className="attemtps-plus1" onClick={() => incrementAttempts(boulder.id, boulder.attempts)}>+1</button>
                        <input ref={attemptsValueField} className="attempts-adjust-input" type="text" />
                        <button onClick={() => adjustAttemptsByValue(boulder.id)}>Set by Value</button>
                      </Col>
                    )}
                  </Row>
                  {localStorage.getItem('id') == boulder.user_id && (
                    <button className="remove-project-button" onClick={()=>{completeProject(boulder.id)}} >Complete</button>
                  )}
                  {localStorage.getItem('id') == boulder.user_id && (
                    <button className="remove-project-button" onClick={()=>{removeProject(boulder.id)}} >Remove From Projects</button>
                  )}
                </div>
              ))
          )}
        </Col>
        </Row>
      </Col>
    </Row>
  );
}
