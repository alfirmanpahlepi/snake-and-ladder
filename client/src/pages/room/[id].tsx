export default function Room() {
  return (
    <div className="p-5 h-screen w-screen flex space-x-7">
      <div className="flex-[2.5] ring p-5 flex flex-col space-y-5">
        <div className="h-2/3 ring p-3 flex space-x-5">
          <div className="ring flex-1"></div>
          <div className="ring p-2 flex-1 grid grid-cols-10 gap-2">
            {
              grids().map((el) => (
                <span key={el} className="border flex justify-center items-center text-sm">{el}</span>
              ))
            }
          </div>
        </div>
        <div className="h-1/3 ring p-5 flex space-x-5">
          <button className="w-1/2 bg-green-500 hover:bg-green-600 active:bg-green-400 shadow-lg rounded-3xl text-white flex justify-center items-center text-7xl font-bold uppercase tracking-widest">ready</button>
          <div className="w-1/2 flex flex-col">
            <div className="flex-grow overflow-auto border">
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
      <div className="flex-1 ring px-5 overflow-auto">
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

const grids = () => {
  const arr = []
  const temp = []
  for (let i = 100; i >= 1; i--) {
    temp.push(i)
    if(temp.length === 10){
      if(temp[0] % 20 !== 0) temp.reverse()
      arr.push(...temp)
      temp.length = 0
    }
  } 

  return arr
}

console.log(grids());

