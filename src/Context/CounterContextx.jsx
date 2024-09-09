import { createContext } from "react";


export let CounterContext = createContext(0);

export default function CounterContextProvide(){
    return <CounterContext.Provider value={{}}>
    </CounterContext.Provider>
}