import React, { useEffect } from "react";
import { useState } from "react";
import { joinGame as _joinGame } from "../firebase/interact";
import { rtdb } from "../firebase/config";
import { useHistory } from 'react-router-dom'

const GameJoiner = ({
  setPid,
  setGid,
  setShowCreateGame,
}: {
  setPid: (pid: string) => void;
  setGid: (gid: string) => void;
  setShowCreateGame: (showCreateGame: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordDisabled, setPasswordDisabled] = useState(false);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (window.location.search.startsWith("?game_id=")) {
      setPasswordDisabled(true);
      setPassword(window.location.search.substr("?game_id=".length));
    }
    setName(window.localStorage.getItem('playerName') || "");
    setPassword(window.localStorage.getItem('gameName') || "");
  }, []);

  const resetGameId = () => {
    setPasswordDisabled(false);
    history.push("/");
  };

  const handlePasswordError = () => {
    setPassword("");
    setPasswordError("Bitte eine existierende Spiel ID angeben!");
    setPasswordDisabled(false);
  };

  const joinGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameError("");
    setPasswordError("");
    if (name.length < 3) {
      setNameError("Bitte einen Namen mit mindestens 3 Buchstaben eingeben!");
      return;
    }
    if (password.length < 3) {
      setPasswordError("Bitte eine existierende Spiel ID angeben!");
      return;
    }
    rtdb
      .ref("games")
      .child(password)
      .once("value", snap => {
        if (snap.val()) {
          setGid(password);
          const pid = _joinGame(name, password);
          if (pid === null) {
            setPasswordError("Unerwarteter Fehler beim Spielbeitritt aufgetreten.");
          }
          setPid(pid!);
          window.localStorage.setItem('playerName', name);
          window.localStorage.setItem('gameName', password);
        } else {
          handlePasswordError();
        }
      }, error => {
        handlePasswordError();
      });
  };

  return (
    <div className="gameStarter">
      <div className="container">
        <form className="flexForm" onSubmit={joinGame}>
          <label className="formLabel">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="formInput nameField"
          />
          {nameError && <div className="errorField">{nameError}</div>}
          {!passwordDisabled && <label className="formLabel">Spiel ID:</label>}
          {!passwordDisabled && <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="formInput passwordField"
            readOnly={passwordDisabled}
          />}
          {passwordError && <div className="errorField">{passwordError}</div>}
          <button type="submit" className="startButton">Spiel beitreten</button>
          <div className="spacer"></div>
          {!passwordDisabled && <button type="button" className="startButton" onClick={() => setShowCreateGame(true)}>Neues Spiel</button>}
          {passwordDisabled && <button type="button" className="startButton" onClick={resetGameId}>Abbrechen</button>}
        </form>
      </div>
    </div>
  );
};

export default GameJoiner;
