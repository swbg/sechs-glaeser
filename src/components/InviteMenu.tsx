import { useEffect, useState, useRef } from "react";


const InviteMenu = ({ gid }: { gid: string; }) => {
  const [url, setUrl] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrl(`${window.location.href}join?game_id=${gid}`);
  }, [gid]);

  const copyLink = () => {
    if (inputRef && inputRef.current) {
      const inputElement = inputRef.current;
      inputElement.focus();
      inputElement.select();
      try {
        const success = document.execCommand("copy");
        if (success) {
          setShowMenu(false);
        } else {
          setError("Ein Fehler ist aufgetreten, bitte kopiere den Link manuell.");
        }
      } catch (e) {
        setError("Ein Fehler ist aufgetreten, bitte kopiere den Link manuell.");
      }
    }
  };

  return (
    <div className="inviteMenu">
      {showMenu && 
      <div className="veil">
        <div className="container">
          <div className="infoDialog">
            <input
              type="text"
              value={url}
              onChange={() => false}
              className="formInput urlField"
              ref={inputRef}
            />
            {error && <div className="errorField">{error}</div>}
            <button className="rollButton" onClick={() => copyLink()}>
              Link kopieren
            </button>
            <button className="rollButton" onClick={() => setShowMenu(false)}>
              Abbrechen
            </button>
          </div>
        </div>
      </div>}

      <button type="button" className="startButton" onClick={() => setShowMenu(true)}>Freunde einladen</button>
    </div>
    
  );
};

export default InviteMenu;