import { NextApiRequest, NextApiResponse } from 'next';

import {
  createRecord,
  getRecordByColumn,
  getRecordById,
} from '@/src/utils/crud';
import User from '@/src/type/User';
import { omitUserPassword } from '@/src/services/users';
import { withMethod } from './middleware';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const existingUser = await getRecordByColumn<User>('User', 'name', req.body.name);
  if (existingUser) {
    return res.json({
      success: false,
      message: 'User is already existing.',
    })
  }
  const userId = await createRecord<User>('User', { name: req.body.name, password: req.body.password });
  const user = await getRecordById<User>('User', userId);
  if (user) {
    return res.json({
      success: true,
      message: 'Register successful',
      data: omitUserPassword(user),
    })
  }
  res.json({
    success: false,
    message: 'Register unsuccessful',
  })
}

export default withMethod(handler, ['POST']);
