import Layout from "@/components/Layout";
import { useRouter } from "next/router"
import { useEffect } from "react";
import socket from "./config/socket";
import { useGlobalState } from "./_app";

export default function Home() {
  const { push } = useRouter()
  const { name, setName } = useGlobalState()

  useEffect(() => {
    if (!name) {
      const newName = prompt("your name")
      if (!newName) {
        alert("name cant be empty")
        return window.location.reload()
      } else {
        setName(newName)
        socket.emit("online", { name: newName }, (error: string) => { if (error) return alert(error) })
      }
    }
  }, [])

  useEffect(() => {
    socket.on("users", ({ users }) => console.log(users)
    )
  }, [])

  console.log(name);


  const createRoom = () => {
    const roomName = prompt("room name ?");
    if (!roomName) return alert("can not be empty");
    else push(`/room/${roomName}`)
  };

  const joinRoom = () => {
    const roomId = prompt("room id ?");
    if (!roomId) return alert("can not be empty");
  };

  return (
    <Layout blur={false}>
      <div className="h-full w-full flex">
        <div className="z-10 h-full w-full flex flex-col justify-center items-center">
          <h4
            style={{
              textShadow:
                "-4px 4px 0 #fff,4px 4px 0 #fff,4px -4px 0 #fff,-4px -4px 0 #fff",
            }}
            className="text-8xl font-extrabold text-red-600 mb-40"
          >
            Snake & Ladder
          </h4>
          <button
            onClick={createRoom}
            className="border-2 border-white py-2 px-8 text-xl font-semibold rounded-3xl text-white bg-red-700 hover:scale-110 duration-200"
          >
            Create Room
          </button>
          <span className="my-3 font-bold text-lg">or</span>
          <button
            onClick={joinRoom}
            className="border-2 border-white py-2 px-8 text-xl font-semibold rounded-3xl text-white bg-green-700 hover:scale-110 duration-200"
          >
            Join Room
          </button>
        </div>
      </div>
    </Layout>
  );
}
