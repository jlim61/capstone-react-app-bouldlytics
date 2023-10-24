import { Dispatch, SetStateAction, createContext, useState } from "react"
import { Holds } from "../types"


interface HoldsContextValues {
  holds: Holds
  setHolds: Dispatch<SetStateAction<Holds>>
}

export const HoldsContext = createContext({} as HoldsContextValues)

export default function HoldsContextProvider({children}: {children: JSX.Element | JSX.Element[]}) {
  
  const [holds, setHolds] = useState({starting_holds: [], usable_holds: [], finish_holds: []} as Holds)

  const value = {holds, setHolds}

  return (
    <>
      <HoldsContext.Provider value={value}>
        {children}
      </HoldsContext.Provider>
    </>
  )
}
