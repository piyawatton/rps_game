import * as React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { Space } from 'antd';
import Score from '@/src/type/Score';
import { determineAction } from '@/src/services/play';
import ScoreLog from '@/src/type/ScoreLog';

interface IPlayResultProps {
  score: ScoreLog;
}


const PlayResult: React.FunctionComponent<IPlayResultProps> = (props) => {
  const item = props.score;
  const result = determineAction(item.player_action, item.bot_action)
  return (
    <List.Item>
      <Space>
        <TextCenter>
          <div>Result</div>
          <Typography.Text type={getType(result)}>
            {result}
          </Typography.Text>
        </TextCenter>
        <TextCenter>
          <div>You</div>
          <Image
            src={`/assets/${item.player_action.toLowerCase()}.png`}
            alt={`/assets/${item.player_action.toLowerCase()}.png`}
            width={40}
            height={40}
          />
        </TextCenter>
        <TextCenter>
          <div>Bot</div>
          <Image
            src={`/assets/${item.bot_action.toLowerCase()}.png`}
            alt={`/assets/${item.bot_action.toLowerCase()}.png`}
            width={40}
            height={40}
          />
        </TextCenter>
        <TextCenter>
          <div>Score</div>
          {item.current_score}
        </TextCenter>
      </Space>
    </List.Item>
  )
}

export default PlayResult;
