import type { AppProps } from "next/app";
import { createContext, useContext, useState } from "react";

import "../styles/globals.css";

const globalState: any = createContext({})

export default function App({ Component, pageProps }: AppProps) {
  const [name, setName] = useState("")
  const [users, setUsers] = useState([])

  return <globalState.Provider value={{ name, setName, users, setUsers }}>
    <Component {...pageProps} id="component" />
  </globalState.Provider>;
}

type User = {
  name: String,
  id: String
}

type Users = User[]

type GLobalState = {
  users: Users,
  name: String,
  setUsers: Function
  setName: Function,
}

export const useGlobalState = (): GLobalState => useContext(globalState)
