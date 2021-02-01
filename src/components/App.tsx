import { useState, useEffect } from "react";
import GameStarter from "./GameStarter";
import Game from "./Game";
import { rtdb } from "../firebase/config";
import { gameType } from "../utils";

const App = () => {
  const [pid, setPid] = useState<string | null>("");
  const [gid, setGid] = useState<string>("");
  const [game, setGame] = useState<gameType | null>(null);

  // Listen to RTDB game instance
  useEffect(() => {
    if (gid) {
      rtdb
        .ref("games")
        .child(gid)
        .on("value", (snap) => {
          setGame(snap.val());
        });
      return () => {
        rtdb.ref("games").off();
      };
    }
  }, [gid]);

  return (
    <div className="app">
      {!(pid && gid && game) && <GameStarter setPid={setPid} setGid={setGid} />}
      {pid && gid && game && <Game pid={pid} gid={gid} game={game} />}
    </div>
  );
};

export default App;
