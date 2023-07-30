import { NextApiRequest, NextApiResponse } from 'next';

import {
  getRecordById,
} from '@/src/utils/crud';
import User from '@/src/type/User';
import { detachToken, omitUserPassword } from '@/src/services/users';
import { withAuth, withMethod } from './middleware';
import { ProfileResponse } from '@/src/type/api';

export async function handler(req: NextApiRequest, res: NextApiResponse<ProfileResponse>) {
  const jwtData = detachToken(req.headers.authorization || '');
  const user = await getRecordById<User>('User', `${jwtData.userId}`)
  if (user) {
    res.json({
      success: true,
      data: {
        user: omitUserPassword(user),
        score: 0,
        highScore: 6,
      }
    })
  }
}

export default withAuth(withMethod(handler, ['GET']));
