'use client'

import { FloatButton, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PoweroffOutlined from '@ant-design/icons/lib/icons/PoweroffOutlined';
import cookieUtils from '@/src/utils/cookies';
import TrophyFilled from '@ant-design/icons/lib/icons/TrophyFilled';

export default function RootLayout({
  children, // will be a page or nested layout
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
    <section>
      {children}
      <FloatButton.Group
        trigger="click"
        type="primary"
      >
        <FloatButton icon={(
          <Image src="/assets/paper.png" alt="logo" width={21} height={21} />
        )} onClick={() => { router.push('/play') }} />
        <FloatButton icon={<TrophyFilled />} onClick={() => { router.push('/ranking') }} />
        <FloatButton icon={<PoweroffOutlined />} onClick={onLogout} />
      </FloatButton.Group>
    </section>
  )
}