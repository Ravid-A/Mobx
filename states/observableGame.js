import { makeObservable, observable, computed, action, autorun } from "mobx";
import { getRandomBighead } from "../utils/bigHeadDataRandomizer";

export class ObservableGame {
  static nextId = 0;

  interval = null;
  players = [];
  guessedLetters = [];
  game_started = false;
  word = "";

  current_player = 0;

  constructor() {
    makeObservable(this, {
      players: observable,
      guessedLetters: observable,
      game_started: observable,
      getWord: action,
      getPlayersCount: action,
      getGameEnded: action,
      getWinner: action,
      startGame: action,
      endGame: action,
      setInterval: action,
      addPlayer: action,
      removePlayer: action,
      renamePlayer: action,
      generateHead: action,
      addScore: action,
      addLetter: action,
      getGuessedLetters: action,
      guessLetter: action,
    });
  }

  getWord() {
    console.log(this.word);
    return this.word.split("").map((letter) => {
      return this.guessedLetters.includes(letter) ? letter : "_ ";
    });
  }

  getPlayersCount() {
    return this.players.length;
  }

  getGameEnded() {
    return (
      this.game_started &&
      this.word.split("").every((letter) => {
        return this.guessedLetters.includes(letter);
      })
    );
  }

  getWinner() {
    return this.players.reduce((prev, current) => {
      return prev == undefined || prev.score < current.score ? current : prev;
    }, undefined);
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

  addPlayer(name) {
    this.players.push({
      id: ObservableGame.nextId++,
      name: name,
      bighead: getRandomBighead(),
      score: 0,
      letters: [],
    });
  }

  removePlayer(id) {
    this.players = this.players.filter((player) => player.id !== id);
  }

  renamePlayer(id, name) {
    this.players = this.players.map((player) => {
      if (player.id === id) {
        player.name = name;
      }
      return player;
    });
  }

  generateHead(id) {
    this.players = this.players.map((player) => {
      if (player.id === id) {
        player.bighead = getRandomBighead();
      }
      return player;
    });
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

  getGuessedLetters() {
    //not the letters in word
    return this.guessedLetters
      .filter((letter) => !this.word.includes(letter))
      .join(", ");
  }

  guessLetter() {
    this.current_player = (this.current_player + 1) % this.players.length;

    do {
      var letter = this.getRandomLetter();
    } while (this.guessedLetters.includes(letter));

    this.addLetter(this.players[this.current_player], letter);
  }

  getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }
}
