interface ScoreLog {
  id: string;
  score_id: string;
  player_action: string;
  bot_action: string;
  previous_score: number;
  current_score: number;
  created_at: Date;
}

export default ScoreLog;
