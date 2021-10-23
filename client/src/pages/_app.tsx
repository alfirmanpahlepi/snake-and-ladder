import type { AppProps } from "next/app";
import { createContext, useContext, useState } from "react";
import "../styles/globals.css";

interface Room {
  id: String,
  name: String
}

interface User {
  name: String,
  id: String
  room: Room
}

type Users = User[]

interface GlobalState {
  users: Users,
  name: String,
  setUsers: Function
  setName: Function,
}

const globalState: any = createContext({})

export default function App({ Component, pageProps }: AppProps) {
  const [name, setName] = useState("")
  const [users, setUsers] = useState([])

  return <globalState.Provider value={{ name, setName, users, setUsers }}>
    <Component {...pageProps} id="component" />
  </globalState.Provider>;
}

export const useGlobalState = (): GlobalState => useContext(globalState)
