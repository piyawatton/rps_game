import { NextApiRequest, NextApiResponse } from 'next';

import {
  getRecordsByColumn,
} from '@/src/utils/crud';
import { withMethod } from './middleware';
import Score from '@/src/type/Score';
import { OrderByDirection } from '@/src/type/enum';
import { BaseResponse } from '@/src/type/BaseResponse';

export async function handler(req: NextApiRequest, res: NextApiResponse<BaseResponse<Score[]>>) {
  const globalHighScore = await getRecordsByColumn<Score>('Score', {
    orderByColumn: 'score',
    orderByDirection: OrderByDirection.DESC,
    limit: 10,
    joinTable: 'User',
    joinOnColumn: 'user_id',
  })
  if (globalHighScore) {
    res.json({
      success: true,
      data: globalHighScore || [],
    })
  }
  console.log(globalHighScore);
  
  res.json({
    success: false,
    message: 'Something went wrong'
  })
}

export default withMethod(handler, ['GET']);
