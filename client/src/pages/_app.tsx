import { createContext, useContext, useState } from "react";
import type { AppProps } from "next/app";
import { GlobalState, IUsers, User } from "@/types";
import "../styles/globals.css";

const globalState: any = createContext<Partial<GlobalState>>({})

export default function App({ Component, pageProps }: AppProps) {
  const [name, setName] = useState<string>("")
  const [users, setUsers] = useState<IUsers | User[]>([])

  return (
    <globalState.Provider value={{ name, setName, users, setUsers }}>
      <Component {...pageProps} id="component" />
    </globalState.Provider>
  );
}

export const useGlobalState = (): GlobalState => useContext(globalState)
