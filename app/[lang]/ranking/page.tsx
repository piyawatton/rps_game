import { ContentCenter, FullScreenHeight, TextCenter } from "@/src/components/Base/index.styled";
import { Name, Rank, RankingItemContainer, Score } from "@/src/components/RankingItem";
import { getRanking } from '@/src/fetch/api';

const getMedal = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank
};
export default async function RankingPage() {
  const ranking = await getRanking();
  return (
    <FullScreenHeight>
      <ContentCenter>
        <TextCenter>
          <h2>🎉🏆 Top 10 Ranking 🏆🎉</h2>
          <div>
            {ranking.data?.map((score, index) => (
              <RankingItemContainer>
                <Rank>{getMedal(index + 1)}</Rank>
                <Name>{score.name}</Name>
                <Score>{score.score}</Score>
              </RankingItemContainer>
            ))}
          </div>
        </TextCenter>
      </ContentCenter>
    </FullScreenHeight>
  )
}
