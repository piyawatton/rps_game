import { NextApiRequest, NextApiResponse } from 'next';

import {
  createRecord,
  getRecordByColumn,
  getRecordById,
} from '@/src/utils/crud';
import User from '@/src/type/User';

const omitUserPassword = (user: User): Omit<User, "password"> => {
  const { password, ...omitPasswordUser } = user;
  return omitPasswordUser;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const existingUser = await getRecordByColumn<User>('User', 'name', req.body.username);
    if (existingUser) {
      res.json({
        success: false,
        message: 'Register unsuccessful',
      })
    }
    const userId = await createRecord<User>('User', { name: req.body.username, password: req.body.password });
    const user = await getRecordById<User>('User', userId);
    // Process a POST request
    if (user) {
      res.json({
        success: true,
        message: 'Register successful',
        data: omitUserPassword(user),
      })
    }

  } else if (req.method === 'GET') {

  }
  else {
    // Handle any other HTTP method
    res.json({
      success: false,
      message: 'method not aollow',
    })
  }
}