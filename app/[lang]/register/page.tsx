import { Col, Row } from 'antd';
import { ContentCenter, FullScreenHeight } from "@/src/components/Base/index.styled";
import RegisterForm from '@/src/components/RegisterForm';

export default async function HomePage() {
  return (
    <FullScreenHeight>
      <ContentCenter>
        <Row align="bottom" justify="center">
          <Col style={{ textAlign: 'center' }}>
            <h2>Register</h2>
            <RegisterForm />
          </Col>
        </Row>
      </ContentCenter>
    </FullScreenHeight>
  )
}
