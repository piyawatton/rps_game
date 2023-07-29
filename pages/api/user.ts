import { NextApiRequest, NextApiResponse } from 'next';

import {
  createRecord,
  getRecordByColumn,
  getRecordById,
} from '@/src/utils/crud';
import User from '@/src/type/User';
import { omitUserPassword } from '@/src/services/users';
import { withAuth, withMethod } from './middleware';

export async function handler(req: NextApiRequest, res: NextApiResponse) {

}
export const config = {
  api: {
    bodyParser: false, // Required to use middleware in API routes
    externalResolver: true, // Required to use middleware in API routes
  },
};

export default withAuth(withMethod(handler, ['GET']));
