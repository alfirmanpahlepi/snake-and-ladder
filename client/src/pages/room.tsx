import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGlobalState } from "./_app";
import { IUsers, User, Users } from "@/types";
import socket from "@/config/socket";
import Chat from "@/components/Chat";
import Layout from "@/components/Layout";
import Player from "@/components/Player";
import Settings from "@/components/Settings";
import OnlineUser from "@/components/OnlineUser";
import ToggleReady from "@/components/ToggleReady";

export default function Room(): JSX.Element {
  const { replace, query, reload, push } = useRouter()
  const { name, users } = useGlobalState()
  const [roomMate, setRoomMate] = useState<IUsers>([])

  useEffect((): any => {
    if (!name || !query.name || !query.id || !users.length) return replace("/")
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
    socket.on("roomData", ({ roomMate }: { roomMate: Users }): void => {
      setRoomMate(roomMate)
      const readyPlayer: number = roomMate.filter((user: User) => user.isReady).length
      const maxPlayer: number = roomMate[0].room.maxPlayer
      if (readyPlayer == maxPlayer) push("/play")
    })

    socket.on("kicked", reload)

    return () => setRoomMate([])
  }, [])

  return (
    <Layout blur={false}>
      <div className="p-5 h-full w-full flex space-x-7">
        <div className="flex-[2.5] border p-5 flex flex-col space-y-5 bg-gray-50/50 z-20">
          <div className="h-[calc(100%-300px)]">
            <div className="h-1/2">
              <Settings roomMate={roomMate} />
            </div>
            <div className="h-1/2 p-3 flex justify-center items-center space-x-5">
              {
                roomMate.map((user: User, i: number) => (
                  <Player key={i} user={user} />
                ))
              }
            </div>
          </div>
          <div className="h-[300px] p-5 flex space-x-5">
            <div className="w-1/2 grid place-items-center">
              <ToggleReady roomMate={roomMate} />
            </div>
            <div className="w-1/2">
              <Chat />
            </div>
          </div>
        </div>
        <div className="flex-1 border px-5 overflow-auto bg-gray-50/50 z-20">
          <h4 className="font-bold text-2xl border-b-2 py-3 text-red-800">online users: {users.length}</h4>
          <div className="py-3 space-y-3">
            {
              users.map((user: User, i: number) => (
                <OnlineUser key={i} user={user} />
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}