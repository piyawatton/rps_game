import { NextApiRequest, NextApiResponse } from 'next';

import {
  createRecord,
  getRecordByColumn,
  getRecordByColumns,
  getRecordById,
  updateRecord,
} from '@/src/utils/crud';
import { detachToken } from '@/src/services/users';
import { withAuth, withMethod } from './middleware';
import Score from '@/src/type/Score';
import { Choice, ScoreStatus } from '@/src/type/enum';
import ScoreLog from '@/src/type/ScoreLog';

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
  const isPlayerWin = (
    (playerChoice === Choice.ROCK && botChoice === Choice.SCISSORS) ||
    (playerChoice === Choice.PAPER && botChoice === Choice.ROCK) ||
    (playerChoice === Choice.SCISSORS && botChoice === Choice.PAPER)
  )
  const isTie = playerChoice === botChoice;
  if (isPlayerWin) {
    const newScore = (currentScore?.score || 0) + 1
    await updateRecord<Score>('Score', scoreId, { score: newScore })
    const score = await getRecordById<Score>('Score', scoreId)
    const scoreLogId = await createRecord<ScoreLog>('Score_Log', {
      score_id: scoreId,
      previous_score: currentScore?.score || 0,
      current_score: newScore,
      player_action: playerChoice,
      bot_action: botChoice,
    })
    const scoreLog = await getRecordById<ScoreLog>('Score_Log', scoreLogId);
    return res.json({
      success: true,
      data: {
        result: 'WIN',
        score,
        scoreLog,
      },
    })
  } else if (isTie) {
    const scoreLogId = await createRecord<ScoreLog>('Score_Log', {
      score_id: currentScore?.id || '',
      previous_score: currentScore?.score || 0,
      current_score: currentScore?.score || 0,
      player_action: playerChoice,
      bot_action: botChoice,
    })
    const scoreLog = await getRecordById<ScoreLog>('Score_Log', scoreLogId);
    return res.json({
      success: true,
      data: {
        result: 'TIE',
        score: currentScore,
        scoreLog,
      },
    })
  } else {
    await updateRecord<Score>('Score', currentScore?.id || '', { status: ScoreStatus.COMPLETED })
    const score = await getRecordById<Score>('Score', scoreId)
    const scoreLogId = await createRecord<ScoreLog>('Score_Log', {
      score_id: currentScore?.id || '',
      previous_score: currentScore?.score || 0,
      current_score: currentScore?.score || 0,
      player_action: playerChoice,
      bot_action: botChoice,
    })
    const scoreLog = await getRecordById<ScoreLog>('Score_Log', scoreLogId);
    return res.json({
      success: true,
      data: {
        result: 'LOSE',
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
      },
    })
  }
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jwtData = detachToken(req.headers.authorization || '');
  const currentScore = await getRecordByColumns<Score>('Score', { status: ScoreStatus.ONGOING, user_id: jwtData.userId });
  if (currentScore) {
    return playing(req, res, currentScore);
  }
  return startPlay(req, res);
}

export default withAuth(withMethod(handler, ['POST']));
