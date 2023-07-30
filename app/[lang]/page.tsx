import Link from 'next/link';
import { Col, Row, Typography } from 'antd';
import Image from 'next/image';
import { ContentCenter, FullScreenHeight } from "@/src/components/Base/index.styled";
import LoginForm from '@/src/components/LoginForm';

export default async function HomePage() {
  return (
    <FullScreenHeight>
      <ContentCenter>
        <Row align="bottom" justify="center">
          <Col style={{ textAlign: 'center' }}>
            <br />
            <br />
            <Image src="/assets/rock.png" alt="/assets/rock.png" width={150} height={150} />
            <Image src="/assets/paper.png" alt="/assets/paper.png" width={150} height={150} />
            <Image src="/assets/scissors.png" alt="/assets/scissors.png" width={150} height={150} />
            Welcome to RPS Game
            <LoginForm />
          </Col>
        </Row>
      </ContentCenter>
    </FullScreenHeight>
  )
}
