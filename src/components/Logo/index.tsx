'use client'

import { Button, Space } from 'antd';
import Cookies from 'js-cookie';
import * as React from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { styled } from 'styled-components';
import { UserInfo } from '@/src/type/User';

interface ILogoProps {
}

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondaryColor} !important;
  box-shadow: ${({ theme }) => theme.secondaryColor}aa 5px 5px, ${({ theme }) => theme.secondaryColor}55 10px 10px;
`;

const Logo: React.FunctionComponent<ILogoProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [title, setTitle] = React.useState('');
  const userInfoStr = Cookies.get('userInfo') as string | undefined;
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : undefined as UserInfo | undefined

  React.useEffect(() => {
    setTitle(typeof window !== 'undefined' && userInfo ? `Hi! ${userInfo.name}` : '')
  }, [pathname]);
  return (
    <Space>
      <StyledButton style={{ boxShadow: '1' }} type="text" onClick={() => { router.push('/') }}>
        <Image src="/assets/rock.png" alt="logo" width={21} height={21} />
        <Image src="/assets/paper.png" alt="logo" width={21} height={21} />
        <Image src="/assets/scissors.png" alt="logo" width={21} height={21} />
      </StyledButton>
      <div style={{ margin: '0 10px' }}>
        {title}
      </div>
    </Space>
  );
};

export default Logo;
