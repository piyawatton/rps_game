import { ScoreStatus } from "./enum";

interface Score {
  id: string;
  user_id: string;
  score: number;
  status: ScoreStatus;
  created_at: Date;
}

export default Score;
