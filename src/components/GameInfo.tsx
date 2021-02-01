import { glassMapper } from "../assets/assets";
import { gameType } from "../utils";

const Glass = ({
  level,
  glassType,
  index,
  highlighted,
}: {
  highlighted: boolean;
  glassType: string;
  level: number;
  index: number;
}) => {
  return (
    <div className={"glass" + (highlighted ? " highlightedGlass" : "")}>
      <img
        src={glassMapper[glassType][level]}
        alt={"" + level}
        className="glassIcon"
      />
      <div>{index}</div>
    </div>
  );
};

const GameInfo = ({
  game,
  countToGo,
}: {
  game: gameType;
  countToGo: number;
}) => {
  return (
    <div className="gameInfo">
      {[0, 1, 2, 3, 4, 5].map((glass) => (
        <Glass
          key={glass}
          level={game[glass]}
          glassType={glass % 2 === 0 ? "beer" : "shot"}
          index={glass + 1}
          highlighted={glass === countToGo % 6}
        />
      ))}
    </div>
  );
};

export default GameInfo;
