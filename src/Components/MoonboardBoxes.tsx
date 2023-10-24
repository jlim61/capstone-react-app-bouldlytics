import { useContext, useState } from "react";
import { HoldsContext } from "../Contexts/HoldsContextProvider";

export default function MoonboardBoxes({ moonboardGrid, holdRadioValue }: { moonboardGrid: string, holdRadioValue: string }) {

    // setting circle state
    const [isCircleActiveSH, setIsCircleActiveSH] = useState(false)
    const [isCircleActiveUH, setIsCircleActiveUH] = useState(false)
    const [isCircleActiveFH, setIsCircleActiveFH] = useState(false)

    const { holds, setHolds } = useContext(HoldsContext)

    const toggleCircle = () => {
            if (holdRadioValue === '1') {
                setIsCircleActiveSH((prevIsCircleActive: boolean) => !prevIsCircleActive)
                setHolds({...holds, starting_holds: !isCircleActiveSH ?  [...holds.starting_holds, moonboardGrid] : holds.starting_holds.filter((hold)=>{
                    return hold != moonboardGrid})})
            }
            if (holdRadioValue === '2') {
                setIsCircleActiveUH((prevIsCircleActive: boolean) => !prevIsCircleActive)
                setHolds({...holds, usable_holds: !isCircleActiveUH ?  [...holds.usable_holds, moonboardGrid] : holds.usable_holds.filter((hold)=>{
                    return hold != moonboardGrid})})
            }
            if (holdRadioValue === '3') {
                setIsCircleActiveFH((prevIsCircleActive: boolean) => !prevIsCircleActive)
                setHolds({...holds, finish_holds: !isCircleActiveFH ?  [...holds.finish_holds, moonboardGrid] : holds.finish_holds.filter((hold)=>{
                    return hold != moonboardGrid})})
            }
        };

    const circleBorderColor = () => {
        if (holdRadioValue === '1') {
            return isCircleActiveSH ? 'green' : 'none';
        }
        if (holdRadioValue === '2') {
            return isCircleActiveUH ? 'blue' : 'none';
        }
        if (holdRadioValue === '3') {
            return isCircleActiveFH ? 'red' : 'none';
        }
    }

    // check if circle active is true, if true then border shows, if false then nothing shows
    const circleStyle = {
        border: isCircleActiveSH || isCircleActiveUH || isCircleActiveFH ? `4px solid ${circleBorderColor()}` : "none",
            marginRight: '2px',
            marginleft: '2px',
            borderRadius: '50%',
            height: '50px',
            width: '50px'
          }

    return (
        <div id={moonboardGrid} style={circleStyle} className="" onClick={toggleCircle}></div>
    )
}

