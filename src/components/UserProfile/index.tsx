'use client'

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button, Card, Modal } from 'antd';

import { getProfile } from '@/src/fetch/api';
import cookieUtils from '@/src/utils/cookies';

interface UserInfoSectionProps {
}

const UserInfoSection: React.FC<UserInfoSectionProps> = () => {
  const router = useRouter();
  const { data: profile, isFetching } = useQuery(['profile'], getProfile, { refetchOnWindowFocus: false });
  return (
    <Card title={profile?.data?.user.name} style={{ maxWidth: 400 }} loading={isFetching}>
      <p>
        <strong>Highscore:</strong> {profile?.data?.highScore}
      </p>
      <p>
        <strong>Score:</strong> {profile?.data?.score}
      </p>
      <Button
        onClick={() => {

          Modal.confirm({
            title: 'Are you sure to logout?',
            onOk: () => {
              cookieUtils.delete('auth');
              cookieUtils.delete('userInfo');
              router.push('/')
            },
          })
        }}
      >
        Logout
      </Button>
    </Card>
  );
};

export default UserInfoSection;
