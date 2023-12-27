import { observer } from "mobx-react-lite";

import Player from "./Player";

const GameArea = observer(({ game }) => {
  const startGame = () => {
    //Create interval
    game.setInterval(() => {
      game.guessLetter();

      if (game.getGameEnded()) {
        game.endGame();
      }
    }, 1000);
    game.startGame();
  };

  const onRename = (player) => {
    game.renamePlayer(
      player.id,
      prompt("Enter a new name for this player", player.name)
    );
  };

  const onGenerateHead = (player) => {
    game.generateHead(player.id);
  };

  const onRemove = (player) => {
    game.removePlayer(player.id);
  };

  return (
    <div>
      {game.players.map((player) => (
        <Player
          key={player.id}
          player={player}
          onRename={() => onRename(player)}
          onGenerateHead={() => onGenerateHead(player)}
          onRemove={() => onRemove(player)}
        />
      ))}
      {game.getPlayersCount() >= 2 && game.getPlayersCount() <= 5 && (
        <div className="game_area">
          <h2>Game Area</h2>
          <p>Word: {game.getWord()}</p>

          <p>Guessed Letters: {game.getGuessedLetters()}</p>

          {game.getGameEnded() && (
            <p>Game Ended! Winner: {game.getWinner().name}</p>
          )}

          {!game.game_started && (
            <button onClick={startGame}>Start Game</button>
          )}
          {game.game_started && (
            <>
              {game.getGameEnded() && (
                <button onClick={() => game.resetGame()}>Reset Game</button>
              )}
              {!game.getGameEnded() && (
                <button onClick={() => game.resetGame()}>Stop Game</button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default GameArea;
