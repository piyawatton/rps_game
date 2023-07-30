import { AxiosInstance } from "../lib/Axios"
import { BaseResponse } from "../type/BaseResponse"
import Score from "../type/Score"
import User, { UserInfo } from "../type/User"
import { PlayRequest, PlayResponse, ProfileResponse } from "../type/api"

export async function getProfile() {
  const res = await AxiosInstance.get<ProfileResponse>(`/api/profile`)
  return res.data
}

export async function login(credentials: { username: string; password: string }) {
  const res = await AxiosInstance.post<BaseResponse<UserInfo> & { token?: string }>('/api/login', credentials);
  return res.data
}

export async function register(payload: User) {
  const res = await AxiosInstance.post<BaseResponse<UserInfo>>('/api/register', payload);
  return res.data
}

export async function playStatus() {
  const res = await AxiosInstance.get<BaseResponse<Score | null>>('/api/play');
  return res.data
}

export async function play(payload: PlayRequest) {
  const res = await AxiosInstance.patch<PlayResponse>('/api/play', payload);
  return res.data
}

export async function start() {
  const res = await AxiosInstance.post<PlayResponse>('/api/play');
  return res.data
}