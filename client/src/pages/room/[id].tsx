export default function Room() {
  return (
    <div className="p-5 h-screen w-screen flex space-x-7">
      <div className="flex-[2] ring p-5 flex flex-col space-y-5">
        <div className="h-2/3 ring">asd</div>
        <div className="h-1/3 ring p-5 flex space-x-5">
          <div className="w-1/2 ring"></div>
          <div className="w-1/2 ring p-3 flex flex-col">
            <div className="flex-grow overflow-auto ring">

              {
                [1, 1, 11, 1, 11, 1, 1, 1, 1, 1, 1, 1].map((el, i) => (
                  <p key={i}>admin : welcome</p>
                ))
              }
            </div>
            <div className="flex items-center py-3 space-x-3">
              <input className="flex-grow ring" />
              <button className="ring px-3">SEND</button>
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
                <button className="px-4 border bg-gray-300 text-gray-700 rounded">invite</button>
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
