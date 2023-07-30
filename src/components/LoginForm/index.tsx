'use client'

import { Form, Input, Button, notification, Space } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import User from '@/src/type/User';
import cookieUtils from '@/src/utils/cookies';
import { login } from '@/src/fetch/api';

const LoginForm = () => {
  const router = useRouter();
  const loginMutation = useMutation(
    login,
    {
      onSuccess: (data) => {
        if (data.success) {
          cookieUtils.set('auth', `${data.token}`.trim());
          cookieUtils.set('userInfo', data.data)
          router.push('/play')
          return;
        }
        notification.error({
          message: data.message,
        });
      },
    }
  );

  const handleSubmit = (value: User) => {
    loginMutation.mutate({ username: value.name, password: value.password });
  };

  return (
    <Form<User> onFinish={handleSubmit} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item label="Username" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="default" onClick={() => { router.push('/register') }}>
            Register
          </Button>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
