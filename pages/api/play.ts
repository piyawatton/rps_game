import { NextApiRequest, NextApiResponse } from 'next';

import {
  createRecord,
  getRecordByColumn,
  getRecordByColumns,
  getRecordById,
  getRecordsByColumn,
  updateRecord,
} from '@/src/utils/crud';
import { detachToken } from '@/src/services/users';
import { withAuth, withMethod } from './middleware';
import Score from '@/src/type/Score';
import { Choice, OrderByDirection, PlayResult, ScoreStatus } from '@/src/type/enum';
import ScoreLog from '@/src/type/ScoreLog';
import { determineAction } from '@/src/services/play';
import db from '@/src/utils/db';

const playing = async (req: NextApiRequest, res: NextApiResponse) => {
  const scoreId = req.body.score_id || '';
  const playerChoice = req.body.player_action;
  if (!playerChoice) {
    return res.json({
      success: false,
      message: 'No player action',
    })
  }
  const currentScore = await getRecordById<Score>('Score', scoreId);
  const isFoundScore = currentScore && currentScore?.status === ScoreStatus.ONGOING
  if (!isFoundScore) {
    return res.json({
      success: false,
      message: 'This score has been done.'
    })
  }
  function getRandomChoice(): Choice {
    const choices = Object.values(Choice);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  const botChoice = getRandomChoice();
  const actionResult = determineAction(playerChoice, botChoice)
  if (actionResult === PlayResult.WIN) {
    const newScore = (currentScore?.score || 0) + 1
    await updateRecord<Score>('Score', scoreId, { score: newScore })
    const score = await getRecordById<Score>('Score', scoreId)
    await createRecord<ScoreLog>('Score_Log', {
      score_id: scoreId,
      previous_score: currentScore?.score || 0,
      current_score: newScore,
      player_action: playerChoice,
      bot_action: botChoice,
    })
    const scoreLog = await getRecordsByColumn<ScoreLog>('Score_Log', {
      column: 'score_id',
      value: scoreId,
      orderByColumn: 'created_at',
      orderByDirection: OrderByDirection.DESC,
    });
    return res.json({
      success: true,
      data: {
        result: PlayResult.WIN,
        score,
        scoreLog,
      },
    })
  } else if (actionResult === PlayResult.TIE) {
    await createRecord<ScoreLog>('Score_Log', {
      score_id: currentScore?.id || '',
      previous_score: currentScore?.score || 0,
      current_score: currentScore?.score || 0,
      player_action: playerChoice,
      bot_action: botChoice,
    })
    const scoreLog = await getRecordsByColumn<ScoreLog>('Score_Log', {
      column: 'score_id',
      value: scoreId,
      orderByColumn: 'created_at',
      orderByDirection: OrderByDirection.DESC,
    });
    return res.json({
      success: true,
      data: {
        result: PlayResult.TIE,
        score: currentScore,
        scoreLog,
      },
    })
  } else {
    await updateRecord<Score>('Score', currentScore?.id || '', { status: ScoreStatus.COMPLETED })
    const score = await getRecordById<Score>('Score', scoreId)
    await createRecord<ScoreLog>('Score_Log', {
      score_id: currentScore?.id || '',
      previous_score: currentScore?.score || 0,
      current_score: currentScore?.score || 0,
      player_action: playerChoice,
      bot_action: botChoice,
    })
    const scoreLog = await getRecordsByColumn<ScoreLog>('Score_Log', {
      column: 'score_id',
      value: scoreId,
      orderByColumn: 'created_at',
      orderByDirection: OrderByDirection.DESC,
    });
    return res.json({
      success: true,
      data: {
        result: PlayResult.LOSE,
        score,
        scoreLog,
      },
    })
  }
}

const startPlay = async (req: NextApiRequest, res: NextApiResponse) => {
  const jwtData = detachToken(req.headers.authorization || '');
  const scoreId = await createRecord<Score>('Score', { score: 0, user_id: jwtData.userId, status: ScoreStatus.ONGOING })
  const score = await getRecordById<Score>('Score', scoreId);
  if (score) {
    return res.json({
      success: true,
      data: {
        score,
        scoreLog: [],
      },
    })
  }
}

const playStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const jwtData = detachToken(req.headers.authorization || '');
  const currentScore = await getRecordByColumns<Score>('Score', { status: ScoreStatus.ONGOING, user_id: jwtData.userId });
  const myHighScore = await db.any(`
    SELECT MAX(score) AS highest_score
    FROM "Score" s 
    WHERE user_id = '${jwtData.userId}';
  `);
  return res.json({
    success: true,
    data: {
      score: currentScore,
      highScore: myHighScore && myHighScore[0] && myHighScore[0].highest_score || 0,
    },
  })
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    return playing(req, res)
  }
  if (req.method === 'GET') {
    return playStatus(req, res)
  }
  if (req.method === 'POST') {
    return startPlay(req, res);
  }
}

export default withAuth(withMethod(handler, ['PATCH', 'GET', 'POST']));
