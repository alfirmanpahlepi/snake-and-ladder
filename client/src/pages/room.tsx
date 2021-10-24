import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGlobalState } from "./_app";
import Chat from "@/components/Chat";
import Layout from "@/components/Layout";
import Player from "@/components/Player";
import Settings from "@/components/Settings";
import User from "@/components/User";
import socket from "@/config/socket";
import ToggleReady from "@/components/ToggleReady";

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

export default function Room() {
  const { replace, query, reload, push } = useRouter()
  const { name, users } = useGlobalState()
  const [roomData, setRoomData] = useState({ room: "", roomMate: [], id: "", admin: "", maxPlayer: 0 })

  useEffect(() => {
    if (!name || !query.name || !query.id) replace("/")
    else {
      socket.emit("join", { roomName: query.name, roomId: query.id }, (erorr: string): void => {
        if (erorr) {
          replace("/");
          alert(erorr);
        }
      })
    }
  }, [])

  useEffect(() => {
    socket.on("roomData", ({ room, roomMate, id, admin, maxPlayer }) => {
      setRoomData({ room, roomMate, id, admin, maxPlayer })
      const readyPlayer = roomMate.filter((user: User) => user.isReady).length
      if (readyPlayer == maxPlayer) push("/play")
    })

    socket.on("kicked", reload)

    return () => setRoomData({ room: "", roomMate: [], admin: "", id: "", maxPlayer: 0 })
  }, [])

  return (
    <Layout blur={true}>
      <div className="p-5 h-full w-full flex space-x-7">
        <div className="flex-[2.5] border p-5 flex flex-col space-y-5 bg-gray-50/50 z-20">
          <div className="h-1/2">
            <Settings currentPlayer={roomData.roomMate.length} />
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
              <ToggleReady />
            </div>
            <div className="w-1/2">
              <Chat />
            </div>
          </div>
        </div>
        <div className="flex-1 border px-5 overflow-auto bg-gray-50/50 z-20">
          <h4 className="font-bold text-2xl border-b-2 py-3">online users: {users.length}</h4>
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