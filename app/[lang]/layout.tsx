'use client'

import { Layout } from 'antd';
import Logo from '@/src/components/Logo';
import Menu from '@/src/components/Menu';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      <Menu />
    </Layout>
  )
}