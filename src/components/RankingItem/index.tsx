'use client'
import { styled } from 'styled-components';

export const RankingItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const Rank = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export const Name = styled.span`
  flex: 1;
`;

export const Score = styled.span`
  font-weight: bold;
`;
