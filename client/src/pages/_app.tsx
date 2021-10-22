import type { AppProps } from "next/app";
import { createContext, useContext, useState } from "react";

import "../styles/globals.css";

const globalState: any = createContext({})

export default function App({ Component, pageProps }: AppProps) {
  const [name, setName] = useState("")

  return <globalState.Provider value={{ name, setName }}>
    return <Component {...pageProps} id="component" />
  </globalState.Provider>;
}

export const useGlobalState = () => useContext(globalState)
