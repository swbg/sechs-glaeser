import React from "react";
import { useState } from "react";
import { createGame as _createGame } from "../firebase/interact";
import { auth } from "../firebase/config";
import { useHistory } from 'react-router-dom'


const GameCreator = () => {
  const [email, setEmail] = useState(window.localStorage.getItem('emailForSignIn') || "");
  const [emailError, setEmailError] = useState("");
  const history = useHistory();

  const createGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    auth.signInWithEmailLink(email, window.location.href)
    .then((result) => {
      window.localStorage.removeItem('emailForSignIn');

      const gid = _createGame();
      if (gid === null) {
        setEmailError("Unerwarteter Fehler aufgetreten.");
      }

      history.push("/join?game_id=" + gid)
    })
    .catch((error) => {
      setEmailError("Die eingegeben Email-Adresse ist ungültig. Bitte verwende die Adresse, die du zuvor verwendet hast!")
    });
  };

  return (
    <div className="gameCreator">
      <div className="container">
        <form className="flexForm" onSubmit={createGame}>
          <label className="formLabel">Email bestätigen:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="formInput nameField"
          />
          {emailError && <div className="errorField">{emailError}</div>}
          <button type="submit" className="startButton">Spiel starten</button>
          <div className="spacer"></div>
          <button type="button" className="startButton" onClick={() => history.push("/")}>Zurück</button>
        </form>
      </div>
    </div>
  );
};

export default GameCreator;
