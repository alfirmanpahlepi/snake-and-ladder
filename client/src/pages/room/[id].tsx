export default function Room() {
  return (
    <div className="p-5 h-screen w-screen flex space-x-7 relative">
      <div className="absolute top-0 left-0 h-screen w-screen bg-cover blur" style={{ backgroundImage: "url(/background.jpg)" }}></div>
      <div className="flex-[2.5] border p-5 flex flex-col space-y-5 bg-gray-50 z-20">
        <p className="text-right">max player :
          <select>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        <div className="h-1/2 p-3 flex justify-center items-center space-x-5">
          {
            [1, 2, 3, 4, 5].map((e) => (
              <div key={e} className="h-40 w-40 flex flex-col justify-center items-center space-y-3">
                <div className="h-20 w-20 rounded-full border-2 grid place-items-center text-2xl font-semibold">A</div>
                <h6 className="font-semibold">Alfirman Ejha Pahlepi</h6>
              </div>

            ))
          }
        </div>
        <div className="h-1/2 p-5 flex space-x-5">
          <button className="w-1/2 bg-green-500 hover:bg-green-600 active:bg-green-400 shadow-lg rounded-3xl text-white flex justify-center items-center text-7xl font-bold uppercase tracking-widest">ready</button>
          <div className="w-1/2 flex flex-col">
            <div className="flex-grow overflow-auto border bg-white">
              {
                [1, 1, 11, 1, 11, 1, 1, 1, 1, 1, 1, 1].map((el, i) => (
                  <p key={i}>admin : welcome</p>
                ))
              }
            </div>
            <div className="flex items-center mt-3 space-x-3">
              <input className="flex-grow border" />
              <button className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-400 text-white px-3">SEND</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 border px-5 overflow-auto bg-gray-50 z-20">
        <h4 className="font-bold text-2xl border-b-2 py-3">online users: 100</h4>
        <div className="py-3 space-y-3">
          {
            users.map((user, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div style={{ backgroundColor: "#" + ((1 << 24) * Math.random() | 0).toString(16) }} className="h-10 w-10 rounded-full flex justify-center items-center">
                    {user[0]}
                  </div>
                  <p className="font-semibold">{user}</p>
                </div>
                <button className="px-4 border bg-gray-300 hover:bg-gray-400 active:bg-gray-200 text-gray-700 rounded">invite</button>
              </div>
            ))
          }

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
