import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Chat from "@/components/Chat";
import Layout from "@/components/Layout";
import Player from "@/components/Player";
import Settings from "@/components/Settings";
import User from "@/components/User";
import { useGlobalState } from "./_app";
import socket from "@/config/socket";

interface Room {
  id: string,
  name: string,
  admin: string,
}

interface User {
  name: string,
  id: string,
  room: Room,
  color: string,
}

export default function Room() {
  const { replace, query } = useRouter()
  const { name, users } = useGlobalState()
  const [roomData, setRoomData] = useState({ room: "", roomMate: [], id: "", admin: "" })

  useEffect(() => {
    if (!name || !query.name || !query.id) replace("/")
    else {
      socket.emit("join", { roomName: query.name, roomId: query.id }, (erorr: string): void => {
        if (erorr) alert(erorr)
      })
    }
  }, [])

  useEffect(() => {
    socket.on("roomData", ({ room, roomMate, id, admin }) => {
      setRoomData({ room, roomMate, id, admin })
    })

    return () => setRoomData({ room: "", roomMate: [], admin: "", id: "" })
  }, [])

  return (
    <Layout blur={true}>
      <div className="p-5 h-full w-full flex space-x-7">
        <div className="flex-[2.5] border p-5 flex flex-col space-y-5 bg-gray-50/50 z-20">
          <div className="h-1/2">
            <Settings />
          </div>
          <div className="h-1/2 p-3 flex justify-center items-center space-x-5">
            {
              roomData.roomMate.map((user: User, i: number) => (
                <Player key={i} user={user} />
              ))
            }
          </div>
          <div className="h-1/2 p-5 flex space-x-5">
            <div className="w-1/2 grid place-items-center">
              <button className="h-[200px] w-[200px] bg-green-500 hover:bg-green-600 active:bg-green-400 border-4 border-green-600 active:border-green-400 shadow-lg rounded-full text-white flex justify-center items-center text-4xl font-bold uppercase tracking-widest duration-500">ready</button>
            </div>
            <div className="w-1/2">
              <Chat />
            </div>
          </div>
        </div>
        <div className="flex-1 border px-5 overflow-auto bg-gray-50/50 z-20">
          <h4 className="font-bold text-2xl border-b-2 py-3">online users: 100</h4>
          <div className="py-3 space-y-3">
            {
              users.map((user: User, i: number) => (
                <User key={i} user={user} />
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}