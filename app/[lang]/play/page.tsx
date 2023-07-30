import { ContentCenter, FullScreenHeight } from "@/src/components/Base/index.styled";
import Game from '@/src/components/Game';

export default async function HomePage() {
  return (
    <FullScreenHeight>
      <ContentCenter>
        <Game />
      </ContentCenter>
    </FullScreenHeight>
  )
}
