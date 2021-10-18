export default function Home() {
  //   const randomHsl = (): string => `hsla(${Math.random() * 360}, 100%, 50%, 1)`;

  return (
    <div className="relative h-screen min-w-screen flex">
      <div
        style={{
          backgroundImage:
            "url('https://store.schoolspecialty.com/OA_HTML/xxssi_ibeGetWCCImage.jsp?docName=F3850995&Rendition=Large')",
        }}
        className="h-screen w-screen bg-cover absolute top-0 left-0"
      ></div>
      <div className="z-10 h-full w-full flex flex-col justify-center items-center ring">
        <h4
          style={{
            textShadow:
              "-4px 4px 0 #fff,4px 4px 0 #fff,4px -4px 0 #fff,-4px -4px 0 #fff",
          }}
          className="text-8xl font-extrabold text-red-600 mb-20"
        >
          Snake & Ladder
        </h4>
        <input className="border-2 border-gray-300 my-10 py-2 px-4 rounded-3xl text-center" />
        <button className="border-2 border-white py-2 px-8 text-xl font-semibold rounded-3xl text-white bg-red-700 hover:scale-125 duration-200">
          Create Room
        </button>
        <span className="my-3 font-bold text-lg">or</span>
        <button className="border-2 border-white py-2 px-8 text-xl font-semibold rounded-3xl text-white bg-green-700 hover:scale-125 duration-200">
          Join Room
        </button>
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
