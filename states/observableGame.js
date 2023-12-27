import { makeObservable, observable, computed, action, autorun } from "mobx";
import { getRandomBighead } from "../utils/bigHeadDataRandomizer";

export class ObservableGame {
  static nextId = 0;

  newPlayer = null;
  addingNewPlayer = false;

  interval = null;
  players = [];
  guessedLetters = [];
  game_started = false;
  word = "";

  constructor() {
    makeObservable(this, {
      players: observable,
      newPlayer: observable,
      addingNewPlayer: observable,
      guessedLetters: observable,
      game_started: observable,
      word: observable,
      setNewPlayer: action,
      isAddingNewPlayer: computed,
      updateNewPlayer: action,
      getWord: computed,
      getPlayersCount: computed,
      getGameEnded: computed,
      getWinner: computed,
      resetGame: action,
      startGame: action,
      endGame: action,
      setInterval: action,
      addPlayer: action,
      removePlayer: action,
      addScore: action,
      addLetter: action,
      getGuessedLetters: computed,
      guessLetter: action,
    });
  }

  setNewPlayer(state) {
    if (!state) {
      this.newPlayer = null;
      this.addingNewPlayer = state;
      return;
    }

    this.newPlayer = {
      name: "",
      bighead: getRandomBighead(),
    };
    this.addingNewPlayer = state;
  }

  get isAddingNewPlayer() {
    return this.addingNewPlayer;
  }

  updateNewPlayer(name, bighead) {
    this.newPlayer = {
      name: name,
      bighead: bighead,
    };
  }

  get getWord() {
    return this.word.split("").map((letter) => {
      return this.guessedLetters.includes(letter) ? letter : "_ ";
    });
  }

  get getPlayersCount() {
    return this.players.length;
  }

  get getGameEnded() {
    return (
      this.game_started &&
      this.word.split("").every((letter) => {
        return this.guessedLetters.includes(letter);
      })
    );
  }

  get getWinner() {
    return this.players.reduce((prev, current) => {
      return prev == undefined || prev.score < current.score ? current : prev;
    }, undefined);
  }

  resetGame() {
    this.endGame();
    this.game_started = false;
    this.word = "";
    this.guessedLetters = [];
    this.players = this.players.map((player) => {
      player.letters = [];
      player.score = 0;
      return player;
    });
  }

  startGame() {
    const wordsArray = [
      "javascript",
      "developer",
      "programming",
      "computer",
      "algorithm",
      "web",
      "code",
      "function",
      "variable",
      "array",
      "object",
      "html",
      "css",
      "node",
      "react",
      "database",
      "function",
      "callback",
      "asynchronous",
      "promise",
      "git",
      "github",
      "debugging",
    ];

    this.game_started = true;
    this.word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    this.guessedLetters = [];
    this.players = this.players.map((player) => {
      player.letters = [];
      player.score = 0;
      return player;
    });
  }

  endGame() {
    clearInterval(this.interval);
  }

  setInterval(func, interval) {
    this.interval = setInterval(func, interval);
  }

  addPlayer() {
    this.players.push({
      id: ObservableGame.nextId++,
      name: this.newPlayer.name,
      bighead: this.newPlayer.bighead,
      score: 0,
      letters: [],
    });

    this.newPlayer = null;
    this.addingNewPlayer = false;
  }

  removePlayer(id) {
    this.players = this.players.filter((player) => player.id !== id);

    if (this.getPlayersCount < 2) {
      this.resetGame();
    }
  }

  addScore(id) {
    this.players = this.players.map((player) => {
      if (player.id === id) {
        player.score++;
      }
      return player;
    });
  }

  addLetter(player, letter) {
    this.players = this.players.map((p) => {
      if (p.id === player.id && this.word.includes(letter)) {
        p.letters.push(letter);
        this.addScore(p.id);
      }
      return p;
    });

    this.guessedLetters.push(letter);
  }

  get getGuessedLetters() {
    //not the letters in word
    return this.guessedLetters
      .filter((letter) => !this.word.includes(letter))
      .join(", ");
  }

  guessLetter() {
    let player = Math.floor(Math.random() * this.players.length);

    do {
      var letter = this.getRandomLetter();
    } while (this.guessedLetters.includes(letter));

    this.addLetter(this.players[player], letter);
  }

  getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }
}
