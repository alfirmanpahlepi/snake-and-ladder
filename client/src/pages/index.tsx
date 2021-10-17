export default function Home() {
  //   const randomHsl = (): string => `hsla(${Math.random() * 360}, 100%, 50%, 1)`;

  return (
    <div
      style={{
        backgroundImage:
          "url('https://ggquiz.netlify.app/dist/img/Background-2.png')",
      }}
      className="h-screen w-screen flex p-5 space-x-5"
    >
      <div className="flex-[4] flex flex-col rounded-3xl bg-white">
        <h2 className="uppercase text-4xl font-bold text-center p-5">
          Snake & ladder
        </h2>
        <div
          style={{
            background:
              "gradient(circle, rgba(99, 155, 193, 1) 0%, rgba(89, 145, 182, 1) 33%, rgba(48, 104, 139, 1) 100%);",
          }}
          className="h-full flex flex-col items-center justify-center"
        >
          <div className="w-1/2 h-[18rem] flex flex-col rounded-2xl">
            <div className="flex border-b-2">
              <button className="p-2">Create</button>
              <button className="p-2">Join</button>
            </div>
            <div className="flex flex-col justify-center items-center h-full space-y-5 py-10">
              <input placeholder="room name" className="text-center border" />
              <button className="bg-indigo-900 text-white font-bold text-xl px-5 py-1 rounded-2xl">
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex-1 overflow-hidden rounded-3xl">
        <h4 className="border-b-2 font-semibold text-2xl p-3">
          online users : {users.length}
        </h4>
        <div className="overflow-auto h-full p-3">
          {users.map((user, index) => (
            <p key={index} className="font-semibold">
              {user}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const users = [
  "Alfirman Ejha Pahlepi",
  "Adam",
  "Alex",
  "Aaron",
  "Ben",
  "Carl",
  "Dan",
  "David",
  "Edward",
  "Fred",
  "Frank",
  "George",
  "Hal",
  "Hank",
  "Ike",
  "John",
  "Jack",
  "Joe",
  "Larry",
  "Monte",
  "Matthew",
  "Mark",
  "Nathan",
  "Otto",
  "Paul",
  "Peter",
  "Roger",
  "Roger",
  "Steve",
  "Thomas",
  "Tim",
  "Ty",
  "Victor",
  "Walter",
];
