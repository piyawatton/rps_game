'use client'
import { styled } from 'styled-components';

export const Background = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
`;
export const Container = styled.div`
  max-width: 1200px;
  min-height: calc(100dvh - 64px);
  background-color: white;
  margin: auto;
`;
export const Padding = styled.div`
  padding: 50px;
`;
export const FullScreenHeight = styled.div`
  height: calc(100dvh - 64px);
`;
export const ContentCenter = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100dvh - 64px);
  align-items: center;
`;
export const TextCenter = styled.div`
  text-align: center;
`;