import { NextApiRequest, NextApiResponse } from 'next';

import { withMethod } from './middleware';
import Score from '@/src/type/Score';
import { BaseResponse } from '@/src/type/BaseResponse';
import { UserInfo } from '@/src/type/User';
import db from '@/src/utils/db';
import { TOP_N_HIGH_SCORE } from '@/src/config/global';

export async function handler(req: NextApiRequest, res: NextApiResponse<BaseResponse<Score[]>>) {
  async function getHighestScoreWithRanking() {
    try {
      const query = `
        SELECT scores.user_id, scores.score, scores.created_at,
        RANK() OVER (ORDER BY scores.score DESC, scores.created_at ASC) AS ranking,
              u.name
        FROM "Score" scores 
        JOIN "User" u ON scores.user_id = u.id
        WHERE scores.score > 0
        LIMIT ${TOP_N_HIGH_SCORE};
      `;

      const results = await db.any(query);
      return results;
    } catch (error) {
      console.error('Error getting highest score with ranking:', error);
      throw error;
    }
  }
  const globalHighScore: (Score & UserInfo)[] = await getHighestScoreWithRanking();
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
