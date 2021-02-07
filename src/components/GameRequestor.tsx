import React from "react";
import { useState } from "react";
import { auth } from "../firebase/config";

const GameRequestor = ({ setShowCreateGame } : { setShowCreateGame: (showCreateGame: boolean) => void; }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const sendLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Set right error fields
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Bitte eine gültige Email eingeben!");
      return;
    } else {
      setEmailError("");
    }

    const actionCodeSettings = {
      url: "https://sechs-glaeser.de/create",
      handleCodeInApp: true,
    }

    auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        setMessage("Email wurde gesendet. Bitte überprüfe dein Postfach.")
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch((error) => {
        setMessage(`Leider ist ein Fehler aufgetreten. Fehler ${error.code}: ${error.message}`)
      });
    
  };

  return (
    <div className="gameCreator">
      <div className="container">
        {!message && <form className="flexForm" onSubmit={sendLink}>
          <label className="formLabel">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="formInput nameField"
          />
          {emailError && <div className="errorField">{emailError}</div>}
          <button type="submit" className="startButton">Link senden</button>
          <div className="spacer"></div>
          <button type="button" className="startButton" onClick={() => setShowCreateGame(false)}>Abbrechen</button>
        </form> }
        {message && <div className="flexForm">
          <div>{message}</div>
          <div className="spacer"></div>
          <button type="button" className="startButton" onClick={() => setShowCreateGame(false)}>Zurück</button>
        </div>}
      </div>
    </div>
  );
};

export default GameRequestor;
