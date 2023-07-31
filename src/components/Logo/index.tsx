import { Button, Space } from 'antd';
import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

interface ILogoProps {
}

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondaryColor} !important;
  box-shadow: ${({ theme }) => theme.secondaryColor}aa 5px 5px, ${({ theme }) => theme.secondaryColor}55 10px 10px;
`;

const Logo: React.FunctionComponent<ILogoProps> = () => {
  const router = useRouter();
  return (
    <StyledButton style={{boxShadow: '1'}} type="text" onClick={() => { router.push('/') }}>
      <Image src="/assets/rock.png" alt="logo" width={21} height={21} />
      <Image src="/assets/paper.png" alt="logo" width={21} height={21} />
      <Image src="/assets/scissors.png" alt="logo" width={21} height={21} />
      {/* <Space align="center">
      </Space> */}
    </StyledButton>
  );
};

export default Logo;
