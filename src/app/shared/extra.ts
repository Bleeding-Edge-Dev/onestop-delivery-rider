export interface Extra {
  [n: string]: string;
}
export interface AppUpdate {
  current: string;
  major: true;
  msg: Msg;
}
interface Msg {
  title: string;
  msg: string;
}
