export type playersType = {
  [id: string]: { beer: number; name: string; shot: number };
};

export type gameType = {
  [index: number]: number;
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  pips: number;
  currentPlayer: string;
  round: number;
  state: string;
  players: playersType;
};

const getNextPlayer = (players: playersType, currentPlayer: string) => {
  if (
    currentPlayer === Object.keys(players).reduce((a, b) => (a > b ? a : b))
  ) {
    // Set to minimum player id
    return Object.keys(players).reduce((a, b) => (a < b ? a : b));
  } else {
    // Set to next largest player id
    return Object.keys(players)
      .filter((a) => a > currentPlayer)
      .reduce((a, b) => (a < b ? a : b));
  }
};

export { getNextPlayer };
