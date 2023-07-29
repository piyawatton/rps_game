import jwt from 'jsonwebtoken';
import User from "../type/User"

export const omitUserPassword = (user: User): Omit<User, "password"> => {
  const { password, ...omitPasswordUser } = user;
  return omitPasswordUser;
}

type JwtData = {
  userId: string
};
export const detachToken = (token: string): JwtData => {
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY || '') as JwtData;
  return decodedToken;
}
