import { BaseResponse } from "./BaseResponse";
import { UserInfo } from "./User"

export type ProfileResponse = BaseResponse<{
  user: UserInfo;
  score: number;
  highScore: number;
}>