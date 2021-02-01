import { rtdb } from "./config";
import { gameType } from "../utils";

const joinGame = (
  name: string,
  setPid: (pid: string | null) => void,
  gid: string
) => {
  const uref = rtdb.ref("games").child(gid).child("players").push();
  rtdb.ref(".info/connected").on("value", (snap) => {
    if (snap.val()) {
      uref.onDisconnect().remove();
      uref.set({ name: name, beer: 0, shot: 0 });
    }
  });
  setPid(uref.key);
};

const resetGame = (pid: string, gid: string) => {
  rtdb.ref("games").child(gid).update({
    currentPlayer: pid,
    round: 1,
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    pips: -1,
    state: "start",
  });
};

const updateGame = (gid: string, data: Partial<gameType>) => {
  rtdb.ref("games").child(gid).update(data);
};

const setGameState = (gid: string, state: string) => {
  rtdb.ref("games").child(gid).update({ state: state });
};

const setGlasses = (gid: string, pid: string, glasses: number, gt: string) => {
  rtdb
    .ref("games")
    .child(gid)
    .child("players")
    .child(pid)
    .update({ [gt]: glasses });
};

export { joinGame, resetGame, updateGame, setGameState, setGlasses };
