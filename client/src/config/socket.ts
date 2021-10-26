import io from "socket.io-client";

const ENDPOINT: string = "http://localhost:5000";
const socket: any = io(ENDPOINT);

export default socket;
