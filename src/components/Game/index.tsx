'use client'

import {
  notification, Row, Col,
  Statistic, Button,
  Modal,
  Spin,
} from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { play, playStatus, start } from '@/src/fetch/api';
import { Choice, ScoreStatus } from '@/src/type/enum';
import ScoreLogList from '../ScoreLog';
import ScoreLog from '@/src/type/ScoreLog';


const Game = () => {
  const router = useRouter();

  const { data: currentScore, isFetching, refetch: fetchPlayStatus } = useQuery(['playStatus'], playStatus, { refetchOnWindowFocus: false })
  const playMutation = useMutation(
    play,
    {
      cacheTime: 10000,
      onSuccess: (data) => {
        if (data.success) {
          if (data.data?.score.status === ScoreStatus.ONGOING) {
            // return notification.info({
            //   message: (
            //     <>
            //       {data.data?.result}
            //     </>
            //   )
            // });
            return;
          }
          Modal.info({
            title: `Your score : ${data.data?.score.score}`,
            content: (
              <div>
                <ScoreLogList data={data.data?.scoreLog || []} />
              </div>
            ),
            onOk() { fetchPlayStatus() },
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
      <Image
        onClick={() => {
          playMutation.mutate({ player_action: choice, score_id: currentScore?.data?.id })
        }}
        src={`/assets/${choice.toLowerCase()}.png`}
        alt={`/assets/${choice.toLowerCase()}.png`}
        width={80}
        height={80}
      />
    )
  }

  const isReadyToPlay = currentScore?.data?.id !== undefined;
  const score = React.useMemo(() => {
    if (!isReadyToPlay) return 0;
    if (!playMutation.data?.data?.score) return currentScore?.data?.score;
    return playMutation.data?.data?.score.score;
  }, [currentScore, playMutation.data?.data?.score, isReadyToPlay])

  return (
    <Row>
      <Col>
        <Statistic
          title="Score"
          value={score}
          loading={playMutation.isLoading}
          style={{ width: 80 }}
        />
        <div>
          {isReadyToPlay ? (
            <div>
              <Spin spinning={playMutation.isLoading}>
                {renderChoice(Choice.ROCK)}
                {renderChoice(Choice.PAPER)}
                {renderChoice(Choice.SCISSORS)}
              </Spin>
            </div>
          ) : (
            <div>
              <Button
                size="large"
                disabled={isFetching}
                onClick={() => { gameStartMutation.mutate() }}
              >
                <Spin spinning={isFetching} />
                {isFetching ? 'Loading..' : 'Start'}
              </Button>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Game;
