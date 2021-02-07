import { faceMapper } from "../assets/assets";
import { gameType } from "../utils";

const PlayerInfo = ({ game }: { game: gameType }) => {
  return (
    <div className="playerInfo">
      <div className="playerInfoHeader">Mitspieler</div>
      <div className="playerList">
        <table>
          <tbody>
            {game.players && Object.keys(game.players).map((p) => (
              <tr key={p} className="playerInfoItem">
                <td className="tableEmoji">
                  <img
                    src={faceMapper(
                      game.players[p].beer + game.players[p].shot,
                      game.players[p].name
                    )}
                    alt=""
                    className="imgEmoji"
                  ></img>
                </td>
                <td className="tableText">{game.players[p].name}</td>
                <td className="tableNumber">{game.players[p].beer}</td>
                <td className="tableText">Bier</td>
                <td className="tableNumber">{game.players[p].shot}</td>
                <td className="tableText">Schnaps</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerInfo;
