'use client'

import { register } from '@/src/fetch/api';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, DatePicker, Button, notification, Space } from 'antd';
import { useRouter } from 'next/navigation';

interface RegisterFormProps {
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const registerMutation = useMutation(
    register,
    {
      onSuccess: (data) => {
        if (data.success) {
          router.push('/')
          return;
        }
        notification.error({
          message: data.message,
        });
      },
    }
  );

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      registerMutation.mutate(values);
      form.resetFields();
    });
  };

  return (
    <Form form={form} onFinish={handleSubmit} initialValues={{}} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="default" onClick={() => { router.back() }}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
