"use client"
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/src/type/User';
import styled from 'styled-components';
import {
  Card as AntdCard,
  Typography,
  Space,
  Button,
} from 'antd';
import MailOutlined from '@ant-design/icons/lib/icons/MailOutlined';
import PhoneOutlined from '@ant-design/icons/lib/icons/PhoneOutlined';
import GlobalOutlined from '@ant-design/icons/lib/icons/GlobalOutlined';
import { UserImage } from '../User/Profile.styled';

interface ICardProps {
}

const StyledCard = styled(AntdCard)`
  max-width: 300px;
  margin: auto !important;
  &:hover {
    box-shadow: ${({ theme }) => `
    0 1px 2px -2px ${theme.secondaryColor}29, 
    0 3px 6px 0 ${theme.secondaryColor}1F, 
    0 5px 12px 4px ${theme.secondaryColor}17
    `} !important;
  }
  .ant-card-body { 
    padding: 0 !important;
  }
  .ant-card-meta-title {
    margin: 0 !important;
  }
  .ant-card-meta-description {
    padding: 18px;
    padding-top: 10px;
  }
`;

const UserImageCover = styled(UserImage)`
  padding-top: 20px;
`;

const Title = styled.div`
  padding: 10px 18px;
  background-color: ${({ theme }) => theme.primaryColor};
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Card: React.FunctionComponent<ICardProps & User> = (props) => {
  const router = useRouter();
  return (
    <StyledCard
      hoverable
      onClick={() => {
        router.push(`/users/${props.id}`)
      }}
      cover={(
        <UserImageCover
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/v2/avataaars/${props.username}.svg`}
          alt={`${props.id}-${props.username}`}
        />
      )}
    >
      <AntdCard.Meta
        title={(
          <Title>
            {props.name}
          </Title>
        )}
        description={(
          <Space size={4} direction="vertical">
            <Typography.Text type='secondary'><MailOutlined /> {props.email}</Typography.Text>
            <Typography.Text><PhoneOutlined /> {props.phone}</Typography.Text>
            <Typography.Link underline href={`https://${props.website}`} target="_blank">
              <GlobalOutlined />
              &nbsp;
              {props.website}
            </Typography.Link>
            <Button type="primary">More..</Button>
          </Space>
        )}
      />
    </StyledCard>
  );
};

export default Card;
