interface User {
  id?: string;
  name: string;
  password: string;
  created_at?: Date;
}

type UserInfo  = Omit<User, 'password'>

export default User;
export { UserInfo }
