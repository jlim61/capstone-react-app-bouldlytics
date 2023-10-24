import MoonboardBoxes from "./MoonboardBoxes";



export default function MoonboardImage({ holdRadioValue }: { holdRadioValue: string}) {

  return (
    <div id="moonboard-div-image">
        <div id="moonboard-holds-container">
            <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13, 14,15,16,17,18].reverse().map((number: number) => {
                return 'ABCDEFGHIJK'.split('').map((letter: string) => {
                    return <MoonboardBoxes key={`${letter}${number}`} moonboardGrid={`${letter}${number}`} holdRadioValue={holdRadioValue}/>
                })
            })}
            </>
        </div>
    </div>
  )
}
