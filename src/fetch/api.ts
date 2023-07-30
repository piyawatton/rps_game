import { AxiosInstance } from "../lib/Axios"
import { BaseResponse } from "../type/BaseResponse"
import User, { UserInfo } from "../type/User"
import { ProfileResponse } from "../type/api"

export async function getProfile() {
  const res = await AxiosInstance.get<ProfileResponse>(`/api/profile`)
  return res.data
}

export async function login(credentials: { username: string; password: string }) {
  const res = await AxiosInstance.post<BaseResponse<UserInfo> & { token?: string }>('/api/login', credentials);
  return res.data
}