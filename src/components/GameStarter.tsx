import React from "react";
import { useState } from "react";
import { joinGame } from "../firebase/interact";
import { rtdb } from "../firebase/config";

const GameStarter = ({
  setPid,
  setGid,
}: {
  setPid: (pid: string | null) => void;
  setGid: (gid: string) => void;
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const startGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length < 3) {
      setNameError("Bitte einen Namen mit mindestens 3 Buchstaben eingeben!");
      return;
    } else {
      setNameError("");
    }
    if (password.length < 3) {
      setPasswordError("Bitte das korrekte Passwort eingeben!");
      return;
    } else {
      setPasswordError("");
    }
    rtdb
      .ref("games")
      .child(password)
      .once("value", (snap) => {
        if (snap.val()) {
          setGid(password);
          joinGame(name, setPid, password);
        } else {
          setPasswordError("Bitte das korrekte Passwort eingeben!");
        }
      });
  };

  return (
    <div className="gameStarter">
      <div className="container">
        <form className="flexForm" onSubmit={startGame}>
          <label className="formLabel">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="formInput nameField"
          />
          {nameError && <div className="errorField">{nameError}</div>}
          <label className="formLabel">Passwort:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="formInput passwordField"
          />
          {passwordError && <div className="errorField">{passwordError}</div>}
          <div className="spacer"></div>
          <button type="submit" className="startButton">
            <span className="no-ani">Spiel starten</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameStarter;
