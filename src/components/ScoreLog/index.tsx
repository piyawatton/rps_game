import React from 'react';
import { List, Space, Typography } from 'antd';
import Image from 'next/image';
import ScoreLog from '@/src/type/ScoreLog';
import { TextCenter } from '../Base/index.styled';
import { determineAction } from '@/src/services/play';
import { PlayResult } from '@/src/type/enum';

interface ScoreLogListProps {
  data: ScoreLog[];
}

const getType = (result:PlayResult) => {
  switch (result) {
    case PlayResult.WIN:
      return 'success';
    case PlayResult.LOSE:
      return 'danger';
    default:
      return undefined;
  }
}

const ScoreLogList: React.FC<ScoreLogListProps> = ({ data }) => {

  return (
    <List
      dataSource={data}
      renderItem={(item) => {
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
      }}
    />
  );
};

export default ScoreLogList;
