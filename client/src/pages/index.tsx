import Layout from "components/Layout";
import { useRouter } from "next/router"

export default function Home() {
  const { push } = useRouter()
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
        <div className="z-10 h-full w-full flex flex-col justify-center items-center ring">
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
