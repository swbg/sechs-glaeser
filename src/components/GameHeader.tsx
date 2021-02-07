import { useState } from "react";
import burger from "../assets/burger.svg";
import { gameType } from "../utils";

const GameHeader = ({
  pid,
  gid,
  game,
  resetGame,
  leaveGame,
}: {
  pid: string;
  gid: string;
  game: gameType;
  resetGame: (pid: string, gid: string) => void;
  leaveGame: () => void;
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="gameHeader">
      <div className="flexTop">
        <div className="roundInfo">Runde {game.round}</div>
        <button className="resetButton" onClick={() => setShowInfo(true)}>
          <img src={burger} alt="?"></img>
        </button>
      </div>
      {(showInfo || showRules) && (
        <div className="veil">
          {showInfo && (
            <div className="container">
              <div className="infoDialog">
                <button
                  className="rollButton"
                  onClick={() => {
                    setShowRules(true);
                    setShowInfo(false);
                  }}
                >
                  Regeln anzeigen
                </button>
                <button
                  className="rollButton"
                  onClick={() => {
                    resetGame(pid, gid);
                    setShowInfo(false);
                  }}
                >
                  Spiel zurücksetzen
                </button>
                <button
                  className="rollButton"
                  onClick={() => {
                    leaveGame();
                  }}
                >
                  Spiel verlassen
                </button>
                <button
                  className="rollButton"
                  onClick={() => setShowInfo(false)}
                >
                  Abbrechen
                </button>
              </div>
            </div>
          )}
          {showRules && (
            <div className="container">
              <div className="rulesDialog">
                <div>
                  Spielmaterial
                  <ul>
                    <li>Ein paar Flaschen kühles Bier</li>
                    <li>Eine Flasche Schnaps</li>
                    <li>Ein kleines Glas (ca. 100 ml)</li>
                    <li>Ein Shotglas (20 ml)</li>
                    <li>Ein paar gute Freunde für den Abend</li>
                  </ul>
                </div>
                <div>
                  Spielregeln
                  <ul>
                    <li>
                      Vor dir stehen 6 virtuelle Gläser, die sich im Laufe des
                      Spiels füllen und leeren
                    </li>
                    <li>Zu Beginn deiner Runde würfelst du</li>
                    <li>
                      Trifft deine Augenzahl ein leeres Glas, füllst du auf und
                      beendest deine Runde
                    </li>
                    <li>
                      Trifft deine Augenzahl ein volles Glas, musst du trinken
                      und nochmal würfeln
                    </li>
                  </ul>
                </div>
                <button
                  className="rollButton"
                  onClick={() => {
                    setShowRules(false);
                  }}
                >
                  Schließen
                </button>
              </div>
            </div>
          )}{" "}
        </div>
      )}
    </div>
  );
};

export default GameHeader;
