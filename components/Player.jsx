import { BigHead } from "@bigheads/core";
import { observer } from "mobx-react-lite";

const Player = observer(({ player, onRename, onGenerateHead, onRemove }) => {
  return (
    <div className="player">
      <BigHead className="bighead" {...player.bighead} />
      <div className="details">
        <h2 onDoubleClick={onRename}>{player.name}</h2>
        <p>
          Score: {player.score}
          <br />
          Correct Letters:
          <br />
          <span className="letters">{player.letters.join(", ")}</span>
        </p>
        <button onClick={onRemove}>Remove</button>
        <button onClick={onGenerateHead}>Generate Random Head</button>
      </div>
    </div>
  );
});

export default Player;
