import io from "socket.io-client";

const ENDPOINT: string = "https://snake-and-ladder-server.herokuapp.com/";
const socket: any = io(ENDPOINT);

export default socket;
