import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { getRecordByColumn } from '@/src/utils/crud';
import User from '@/src/type/User';
import { omitUserPassword } from '@/src/services/users';
import { withMethod } from './middleware';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const user = await getRecordByColumn<User>('User', 'name', username);
    if (!user) {
      return res.json({
        success: false,
        message: 'User not found',
      })
    }
    if (user.password === password) {
      const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
        expiresIn: '3d', // Token expiration time (optional)
      });
      return res.json({
        success: true,
        message: 'Login successful',
        data: omitUserPassword(user),
        token,
      })
    }
    res.json({
      success: false,
      message: 'Login unsuccessful',
    })
  } else {
    // Handle any other HTTP method
    res.json({
      success: false
    })
  }
}

export default withMethod(handler, ['POST']);
