import { useState } from "react";
import { gameType, getNextPlayer } from "../utils";
import { updateGame, setGlasses } from "../firebase/interact";
import { glassMapper } from "../assets/assets";

const GlassSelector = ({
  glassType,
  fillGlass,
}: {
  glassType: string;
  fillGlass: (level: number) => void;
}) => {
  return (
    <div className="container">
      <div className="glassSelector">
        <div>Wie viel möchtest du einschenken?</div>
        <div className="glassSelectorList">
          <button onClick={() => fillGlass(3)} className="glassButton">
            <img
              src={glassMapper[glassType][3]}
              alt={"3"}
              className="glassIcon"
            />
            <div>Schön voll</div>
          </button>
          <button onClick={() => fillGlass(2)} className="glassButton">
            <img
              src={glassMapper[glassType][2]}
              alt={"2"}
              className="glassIcon"
            />
            <div>Naja</div>
          </button>
          <button onClick={() => fillGlass(1)} className="glassButton">
            <img
              src={glassMapper[glassType][1]}
              alt={"1"}
              className="glassIcon"
            />
            <div>Weichei</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const GameControls = ({
  pid,
  gid,
  game,
}: {
  pid: string;
  gid: string;
  game: gameType;
}) => {
  const [showSelectGlass, setShowSelectGlass] = useState(false);

  const rollDie = () => {
    let pips = Math.floor(Math.random() * 6);
    if (
      game[pips] === 0 &&
      game.players[pid].name.toLowerCase().includes("x")
    ) {
      // Players with x in their name (like Max) like to drink more often
      pips = Math.floor(Math.random() * 6);
    }
    updateGame(gid, { state: "roll", pips: pips }); // wait for roll
  };

  const drinkGlass = () => {
    const gt = game.pips % 2 === 0 ? "beer" : "shot";
    setGlasses(gid, pid, game.players[pid][gt] + 1, gt);
    updateGame(gid, { state: "start", pips: -1, [game.pips]: 0 }); // report empty glass and roll again
  };

  const fillGlass = (level: number) => {
    setShowSelectGlass(false);
    updateGame(gid, {
      state: "start",
      pips: -1,
      [game.pips]: level,
      round: game.round + 1,
      currentPlayer: getNextPlayer(game.players, game.currentPlayer),
    }); // move to next round
  };

  return (
    <div className="gameControls">
      {showSelectGlass && (
        <div className="veil">
          <GlassSelector
            glassType={game.pips % 2 === 0 ? "beer" : "shot"}
            fillGlass={fillGlass}
          />
        </div>
      )}

      {game.currentPlayer === pid && (
        <div>
          {game.state === "start" && (
            <div className="actionIndicator">
              <div>Du bist dran!</div>
              <button className="rollButton" onClick={rollDie}>
                Würfeln
              </button>
            </div>
          )}
          {game.state === "roll" && (
            <div className="actionIndicator">
              <div>Du würfelst...</div>
              <button id="dummyButton" className="rollButton">
                Würfeln
              </button>
            </div>
          )}
          {game.state === "drink" && (
            <div className="actionIndicator">
              <div>
                Du hast eine {game.pips + 1} gewürfelt und musst{" "}
                {game.pips % 2 === 0 ? "ein Bier" : "einen Schnaps"} trinken!
              </div>
              <button className="rollButton" onClick={drinkGlass}>
                Trinken
              </button>
            </div>
          )}
          {game.state === "fill" && (
            <div className="actionIndicator">
              <div>
                Du hast eine {game.pips + 1} gewürfelt und darfst auffüllen!
              </div>
              <button
                className="rollButton"
                onClick={() => setShowSelectGlass(true)}
              >
                Auffüllen
              </button>
            </div>
          )}
        </div>
      )}

      {game.currentPlayer !== pid && (
        <div>
          {game.state === "start" && (
            <div className="actionIndicator">
              {(game.players[game.currentPlayer] || { name: "Jemand" }).name}{" "}
              ist dran.
            </div>
          )}
          {game.state === "roll" && (
            <div className="actionIndicator">
              {(game.players[game.currentPlayer] || { name: "Jemand" }).name}{" "}
              würfelt...
            </div>
          )}
          {game.state === "drink" && (
            <div className="actionIndicator">
              {(game.players[game.currentPlayer] || { name: "Jemand" }).name}{" "}
              hat eine {game.pips + 1} gewürfelt und muss{" "}
              {game.pips % 2 === 0 ? "ein Bier" : "einen Schnaps"} trinken.
            </div>
          )}
          {game.state === "fill" && (
            <div className="actionIndicator">
              {(game.players[game.currentPlayer] || { name: "Jemand" }).name}{" "}
              hat eine {game.pips + 1} gewürfelt und darf auffüllen.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameControls;
