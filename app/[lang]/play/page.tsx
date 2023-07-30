import { Col, Row } from 'antd';
import { FullScreenHeight } from "@/src/components/Base/index.styled";
import Game from '@/src/components/Game';

export default async function HomePage() {
  return (
    <FullScreenHeight>
      <Row align="bottom" justify="center">
        <Col>
          <Game />
        </Col>
      </Row>
    </FullScreenHeight>
  )
}
