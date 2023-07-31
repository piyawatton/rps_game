'use client'

import {
  notification, Row, Col,
  Statistic, Button,
  Modal,
  Spin,
  Space,
} from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import ConfettiExplosion from 'react-confetti-explosion';
import React from 'react';

import { play, playStatus, start } from '@/src/fetch/api';
import { Choice, PlayResult, ScoreStatus } from '@/src/type/enum';
import ScoreLogList from '../ScoreLog';
import { styled, useTheme } from 'styled-components';
import { DELAY_PLAY } from '@/src/config/global';
import { determineAction } from '@/src/services/play';

const GameButton = styled(Button)`
  height: fit-content !important;
`

const Game = () => {
  const theme = useTheme();
  const [playable, setPlayable] = React.useState<boolean>(true);
  const [isWinRound, setIsWinRound] = React.useState<boolean>(false);
  const { data: currentScore, isFetching, refetch: fetchPlayStatus } = useQuery(['playStatus'], playStatus, { refetchOnWindowFocus: false })
  const playMutation = useMutation(
    play,
    {
      cacheTime: 10000,
      onSuccess: (data) => {
        if (data.success) {
          if (data.data?.score.status === ScoreStatus.ONGOING) {
            setPlayable(false);
            const scoreLog = data.data.scoreLog[0]
            setIsWinRound(determineAction(scoreLog.player_action, scoreLog.bot_action) === PlayResult.WIN)

            return;
          }
          Modal.info({
            title: `Your score : ${data.data?.score.score}`,
            content: (
              <div>
                <ScoreLogList data={data.data?.scoreLog || []} />
              </div>
            ),
            onOk() {
              fetchPlayStatus();
              playMutation.reset();
              gameStartMutation.reset();
            },
          });

          return;
        }
        notification.error({
          message: data.message,
        });
      },
    }
  );

  const gameStartMutation = useMutation(
    start,
    {
      onSuccess: () => {
        fetchPlayStatus();
      },
    }
  )

  const renderChoice = (choice: Choice) => {
    return (
      <GameButton
        disabled={!playable}
        type="dashed"
        onClick={() => {
          playMutation.mutate({ player_action: choice, score_id: currentScore?.data?.score?.id })
        }}
      >
        <Image
          src={`/assets/${choice.toLowerCase()}.png`}
          alt={`/assets/${choice.toLowerCase()}.png`}
          width={80}
          height={80}
        />
      </GameButton>
    )
  }

  React.useEffect(() => {
    if (!playable) {
      setTimeout(() => {
        setPlayable(true);
      }, DELAY_PLAY);
    }
  }, [playable])

  const isReadyToPlay = currentScore?.data?.score?.id !== undefined;
  const score = React.useMemo(() => {
    if (!isReadyToPlay) return 0;
    if (!playMutation.data?.data?.score) return currentScore?.data?.score?.score;
    return playMutation.data?.data?.score.score;
  }, [currentScore, playMutation.data?.data?.score, isReadyToPlay])
  const myHighScore = Math.max(score || 0, currentScore?.data?.highScore || 0);
  return (
    <Row>
      <Col>
        <Space>
          <Statistic
            title="Score"
            value={score}
            loading={isFetching}
            style={{ width: 80 }}
          />
          <Statistic
            title="Highscore"
            value={myHighScore}
            loading={isFetching}
            style={{ width: 80 }}
          />
        </Space>
        <div>
          {isReadyToPlay ? (
            <div>
              <div style={{
                height: 170,
                textAlign: 'center',
                width: 200,
                margin: 'auto',
                position: 'relative',
              }}>
                {!playable && isWinRound && (
                  <div style={{ position: 'absolute', left: '50%' }}>
                    <ConfettiExplosion
                      force={0.4}
                      duration={2200}
                      particleCount={30}
                      width={400}
                      colors={Object.values(theme)}
                    />
                  </div>
                )}
                <ScoreLogList data={playMutation.data?.data?.scoreLog.slice(0, 1) || []} loading={playMutation.isLoading} />
              </div>
              <Spin spinning={playMutation.isLoading}>
                <Space>
                  {renderChoice(Choice.ROCK)}
                  {renderChoice(Choice.PAPER)}
                  {renderChoice(Choice.SCISSORS)}
                </Space>
              </Spin>
            </div>
          ) : (
            <div>
              <Spin spinning={isFetching || gameStartMutation.isLoading}>
                <Button
                  size="large"
                  disabled={isFetching}
                  onClick={() => {
                    playMutation.reset();
                    gameStartMutation.mutate();
                  }}
                >
                  {isFetching ? 'Loading..' : 'Start'}
                </Button>
              </Spin>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Game;
