import { useState, useEffect } from "react";
import GameJoiner from "./GameJoiner";
import GameRequestor from "./GameRequestor";
import GameCreator from "./GameCreator";
import Game from "./Game";
import { rtdb } from "../firebase/config";
import { gameType } from "../utils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [pid, setPid] = useState("");
  const [gid, setGid] = useState("");
  const [game, setGame] = useState<gameType | null>(null);
  const [showCreateGame, setShowCreateGame] = useState(false);

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

  // Function to leave game
  const leaveGame = () => {
    setPid("");
    setGid("");
    setGame(null);
    setShowCreateGame(false);
    rtdb.ref("games").off();
    if (pid && gid) {
      rtdb.ref("games").child(gid).child("players").child(pid).remove();
    }
  };

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/create">
            <GameCreator />
          </Route>
          <Route path="/">
            {!showCreateGame && !(pid && gid && game) && <GameJoiner setPid={setPid} setGid={setGid} setShowCreateGame={setShowCreateGame} />}
            {showCreateGame && <GameRequestor setShowCreateGame={setShowCreateGame} />}
            {!showCreateGame && pid && gid && game && <Game pid={pid} gid={gid} game={game} leaveGame={leaveGame} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
