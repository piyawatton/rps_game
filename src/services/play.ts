import { Choice, PlayResult } from "../type/enum";


export const determineAction = (player: Choice, bot: Choice): PlayResult => {
  if (player === bot) return PlayResult.TIE;
  if ((player === Choice.ROCK && bot === Choice.SCISSORS) ||
    (player === Choice.PAPER && bot === Choice.ROCK) ||
    (player === Choice.SCISSORS && bot === Choice.PAPER)) {
    return PlayResult.WIN;
  }
  return PlayResult.LOSE;
}
