import { observer } from "mobx-react-lite";

const AddPlayer = observer(({ game }) => {
  const onAddPlayer = () => {
    if (game.getPlayersCount() >= 5)
      return alert("You can't have more than 5 players");

    game.addPlayer(prompt("Enter a name for your new player", "Dave"));
  };

  return (
    <div>
      <button onClick={onAddPlayer}>New Player</button>
    </div>
  );
});

export default AddPlayer;
