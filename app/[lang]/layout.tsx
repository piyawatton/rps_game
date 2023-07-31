'use client'

import { FloatButton, Modal, Layout } from 'antd';
import { useRouter } from 'next/navigation';
import PoweroffOutlined from '@ant-design/icons/lib/icons/PoweroffOutlined';
import cookieUtils from '@/src/utils/cookies';
import TrophyFilled from '@ant-design/icons/lib/icons/TrophyFilled';
import Logo from '@/src/components/Logo';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const onLogout = () => {
    Modal.confirm({
      title: 'Are you sure to logout?',
      onOk: () => {
        cookieUtils.delete('auth');
        cookieUtils.delete('userInfo');
        router.push('/')
      },
    })
  }
  return (
    <Layout>
      <Layout.Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Logo />
      </Layout.Header>
      {children}
      <FloatButton.Group type="primary">
        <FloatButton icon={<TrophyFilled />} onClick={() => { router.push('/ranking') }} />
        <FloatButton icon={<PoweroffOutlined />} onClick={onLogout} />
      </FloatButton.Group>
    </Layout>
  )
}