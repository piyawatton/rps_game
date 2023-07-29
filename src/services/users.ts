import { AxiosInstance } from "../lib/Axios"
import { User } from "../type/User"

export async function getUsers() {
  const res = await AxiosInstance.get<User[]>('/users')
  return res.data
}

export async function getUserById(id: string) {
  const res = await AxiosInstance.get<User>(`/users/${id}`)
  return res.data
}