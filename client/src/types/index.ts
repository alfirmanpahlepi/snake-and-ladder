interface Room {
  id: string;
  name: string;
  admin: string;
  maxPlayer: number;
}

export interface User {
  name: string;
  id: string;
  room: Room;
  color: string;
  isReady: boolean;
}

export type Users = User[];
export type IUsers = User[];

export interface GlobalState {
  users: Users;
  name: string;
  setUsers: Function;
  setName: Function;
}

export interface Movement {
  username: string;
  movement: number;
  color: string;
  nextPlayer?: string;
}
[];

export interface Message {
  user: string;
  text: string;
}

export type IMessages = Message[];
export type Messages = Message[];

export type Movements = Movement[];
export type IMovements = Movement[];
