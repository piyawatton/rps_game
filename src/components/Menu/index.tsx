'use client'

import { FloatButton, Modal, Drawer } from 'antd';
import * as React from 'react';
import PoweroffOutlined from '@ant-design/icons/lib/icons/PoweroffOutlined';
import TrophyFilled from '@ant-design/icons/lib/icons/TrophyFilled';
import { useRouter } from 'next/navigation';
import cookieUtils from '@/src/utils/cookies';
import Ranking from '../Ranking';

interface IMenuProps {
}

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);

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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  return (
    <>
      <FloatButton.Group type="primary">
        <FloatButton icon={<TrophyFilled />} onClick={() => { showDrawer(); }} />
        <FloatButton icon={<PoweroffOutlined />} onClick={onLogout} />
      </FloatButton.Group>
      <Drawer title={<h4>🎉🏆 Top 10 Ranking 🏆🎉</h4>} placement="right" onClose={onClose} open={open}>
        <Ranking />
      </Drawer>
    </>
  );
};

export default Menu;
