import { useState, useEffect } from "react";
import { getNextPlayer } from "../utils";
import GameHeader from "./GameHeader";
import GameInfo from "./GameInfo";
import GameControls from "./GameControls";
import PlayerInfo from "./PlayerInfo";
import InviteMenu from "./InviteMenu";
import { updateGame, resetGame, setGameState } from "../firebase/interact";
import { gameType } from "../utils";

const Game = ({
  pid,
  gid,
  game,
  leaveGame,
}: {
  pid: string;
  gid: string;
  game: gameType;
  leaveGame: () => void;
}) => {
  const [countToGo, setCountToGo] = useState<number>(-1);

  // Simulate dice roll by rotating highlighted glasses
  useEffect(() => {
    if (game.state === "start") {
      // Reset countToGo
      setCountToGo(-1);
    } else if (game.state !== "start" && game.pips >= 0) {
      if (countToGo < 0) {
        // Initialize countToGo
        setCountToGo(0);
      } else if (countToGo < game.pips + 3 * 6) {
        // Increment countToGo
        const timeout = window.setTimeout(
          () => setCountToGo((c: number) => c + 1),
          50 + (countToGo * countToGo) / 1.5
        );
        return () => window.clearTimeout(timeout);
      } else if (countToGo >= game.pips + 3 * 6 && game.currentPlayer === pid) {
        // Advance game state
        if (game[game.pips] > 0) {
          setGameState(gid, "drink");
        } else {
          setGameState(gid, "fill");
        }
      }
    }
  }, [gid, game, countToGo]);

  // Claim currentPlayer if currentPlayer leaves
  useEffect(() => {
    if (game.players && !Object.keys(game.players).includes(game.currentPlayer)) {
      const newPid = getNextPlayer(game.players, game.currentPlayer);
      if (pid === newPid) {
        updateGame(gid, {
          currentPlayer: newPid,
          state: "start",
          pips: -1,
        });
      }
    }
  }, [pid, gid, game]);

  return (
    <div className="game">
      {game && (
        <div className="container flexGame">
          <GameHeader pid={pid} gid={gid} game={game} resetGame={resetGame} leaveGame={leaveGame} />
          <GameInfo game={game} countToGo={countToGo} />
          <GameControls pid={pid} gid={gid} game={game} />
          <PlayerInfo game={game} />
          <InviteMenu gid={gid} />
        </div>
      )}
    </div>
  );
};

export default Game;
