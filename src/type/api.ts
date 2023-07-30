import { BaseResponse } from "./BaseResponse";
import Score from "./Score";
import ScoreLog from "./ScoreLog";
import { UserInfo } from "./User"
import { Choice, PlayResult } from "./enum";

export type ProfileResponse = BaseResponse<{
  user: UserInfo;
  score: number;
  highScore: number;
}>

export type PlayRequest = {
  player_action?: Choice;
  score_id?: string;
}

export type PlayResponse = BaseResponse<{
  result: PlayResult;
  score: Score;
  scoreLog: ScoreLog[];
}>

export type RankingResponse = BaseResponse<(Score & UserInfo)[]>