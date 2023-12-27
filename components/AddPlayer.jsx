import { BigHead } from "@bigheads/core";
import { observer } from "mobx-react-lite";
import { getRandomBighead } from "../utils/bigHeadDataRandomizer";

const AddPlayer = observer(({ game }) => {
  const onAddPlayer = () => {
    if (game.getPlayersCount >= 5)
      return alert("You can't have more than 5 players");

    game.setNewPlayer(true);
  };

  const onCancel = () => {
    game.setNewPlayer(false);
  };

  const onSave = () => {
    game.addPlayer();
  };

  const onNameChange = (e) => {
    game.updateNewPlayer(e.target.value, game.newPlayer.bighead);
  };

  const onGenerateHead = () => {
    game.updateNewPlayer(game.newPlayer.name, getRandomBighead());
  };

  return (
    <div>
      <button onClick={onAddPlayer}>New Player</button>

      {game.isAddingNewPlayer && (
        <div className="addplayer">
          <h3>Add Player:</h3>
          <BigHead className="bighead" {...game.newPlayer.bighead} />
          <br />
          <input
            type="text"
            value={game.newPlayer.name}
            onChange={onNameChange}
          />
          <br />
          <button onClick={onGenerateHead}>Generate BigHead</button>
          <br />
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onSave}>Save</button>
        </div>
      )}
    </div>
  );
});

export default AddPlayer;
