import Link from 'next/link';
import { Col, Row, Typography } from 'antd';
import { ContentCenter, FullScreenHeight } from "@/src/components/Base/index.styled";

export default async function HomePage() {
  return (
    <FullScreenHeight>
      <ContentCenter>
        <Row align="bottom" justify="center">
          <Col style={{ textAlign: 'center' }}>
            <br />
            <br />
            Welcome to RPS Game
          </Col>
        </Row>
      </ContentCenter>
    </FullScreenHeight>
  )
}
