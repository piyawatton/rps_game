import Link from 'next/link';
import { Col, Row, Space, Typography } from 'antd';
import Image from 'next/image';
import { ContentCenter, FullScreenHeight } from "@/src/components/Base/index.styled";
import LoginForm from '@/src/components/LoginForm';

export default async function HomePage() {
  return (
    <FullScreenHeight>
      <ContentCenter>
        <Row align="bottom" justify="center">
          <Col style={{ textAlign: 'center' }}>
            <h2>Welcome to RPS Game</h2>
            <Space>
              <Image src="/assets/rock.png" alt="/assets/rock.png" width={80} height={80} />
              <Image src="/assets/paper.png" alt="/assets/paper.png" width={80} height={80} />
              <Image src="/assets/scissors.png" alt="/assets/scissors.png" width={80} height={80} />
            </Space>
            <LoginForm />
          </Col>
        </Row>
      </ContentCenter>
    </FullScreenHeight>
  )
}
