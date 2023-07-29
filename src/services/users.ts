import User from "../type/User"

export const omitUserPassword = (user: User): Omit<User, "password"> => {
  const { password, ...omitPasswordUser } = user;
  return omitPasswordUser;
}


