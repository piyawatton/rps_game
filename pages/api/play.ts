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

const playing = async (req: NextApiRequest, res: NextApiResponse, currentScore: Score) => {
  const scoreId = currentScore?.id || '';
  const playerChoice = req.body.player_action;
  if (!playerChoice) {
    return res.json({
      success: false,
      message: 'No player action',
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
    const scoreLog = await getRecordsByColumn<ScoreLog>('Score_Log', 'score_id', scoreId, 'created_at', OrderByDirection.DESC);
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
    const scoreLog = await getRecordsByColumn<ScoreLog>('Score_Log', 'score_id', scoreId, 'created_at', OrderByDirection.DESC);
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
    const scoreLog = await getRecordsByColumn<ScoreLog>('Score_Log', 'score_id', scoreId, 'created_at', OrderByDirection.DESC);
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

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jwtData = detachToken(req.headers.authorization || '');
  if (req.method === 'PATCH') {
    const scoreId = req.body.score_id || '';
    const currentScore = await getRecordById<Score>('Score', scoreId);
    if (currentScore && currentScore?.status === ScoreStatus.ONGOING) {
      return playing(req, res, currentScore);
    }
    return res.json({
      success: false,
      message: 'This score has been done.'
    })
  }
  if (req.method === 'GET') {
    const currentScore = await getRecordByColumns<Score>('Score', { status: ScoreStatus.ONGOING, user_id: jwtData.userId });
    return res.json({
      success: true,
      data: currentScore,
    })
  }
  if (req.method === 'POST') {
    return startPlay(req, res);
  }
}

export default withAuth(withMethod(handler, ['PATCH', 'GET', 'POST']));
