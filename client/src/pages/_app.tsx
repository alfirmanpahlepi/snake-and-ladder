import type { AppProps } from "next/app";
import { createContext, useContext, useState } from "react";
import "../styles/globals.css";

interface Room {
  id: string,
  name: string,
  admin: string,
  maxPlayer: number,
}

interface User {
  name: string,
  id: string,
  room: Room,
  color: string,
  isReady: boolean,
}

type Users = User[]
type IUsers = User[]

interface GlobalState {
  users: Users,
  name: string,
  setUsers: Function,
  setName: Function,
}

const globalState: any = createContext<Partial<GlobalState>>({})

export default function App({ Component, pageProps }: AppProps) {
  const [name, setName] = useState<string>()
  const [users, setUsers] = useState<IUsers | User[]>()

  return (
    <globalState.Provider value={{ name, setName, users, setUsers }}>
      <Component {...pageProps} id="component" />
    </globalState.Provider>
  );
}

export const useGlobalState = (): GlobalState => useContext(globalState)
