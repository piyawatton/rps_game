import { Choice } from "./enum";

interface ScoreLog {
  id?: string;
  score_id: string;
  player_action: Choice;
  bot_action: Choice;
  previous_score: number;
  current_score: number;
  created_at?: Date;
}

export default ScoreLog;
