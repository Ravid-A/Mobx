import { ObservableGame } from "../states/observableGame";

import AddPlayer from "../components/AddPlayer";
import GameArea from "../components/GameArea";

export default function App() {
  const observableGame = new ObservableGame();

  return (
    <>
      <AddPlayer game={observableGame} />
      <GameArea game={observableGame} />
    </>
  );
}
