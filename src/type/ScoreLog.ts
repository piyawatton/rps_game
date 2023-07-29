import { Action } from "./enum";

interface ScoreLog {
  id: string;
  score_id: string;
  player_action: Action;
  bot_action: Action;
  previous_score: number;
  current_score: number;
  created_at: Date;
}

export default ScoreLog;
