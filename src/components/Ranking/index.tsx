'use client'

import * as React from 'react';
import { Name, Rank, RankingItemContainer, Score } from '../RankingItem';
import { useQuery } from '@tanstack/react-query';
import { getRanking } from '@/src/fetch/api';

interface IRankingProps {
}
const getMedal = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank
};

const Ranking: React.FunctionComponent<IRankingProps> = (props) => {
  const { data: ranking } = useQuery(['ranking'], getRanking, {
  })
  return (
    <div>
      {ranking?.data?.map((score, index) => (
        <RankingItemContainer>
          <Rank>{getMedal(index + 1)}</Rank>
          <Name>{score.name}</Name>
          <Score>{score.score}</Score>
        </RankingItemContainer>
      ))}
    </div>
  );
};

export default Ranking;
