'use client'
import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme.json';

const StyledComponentProvider: FC<PropsWithChildren> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
      <div style={{
        color: theme.primaryColor,
        position: 'fixed',
        zIndex: 1000,
        bottom: 0,
        right: 0,
        opacity: 0.3,
        fontSize: '0.8rem',
      }}>
        Powered by piyawat.chutimavutikul@gmail.com
      </div>
    </ThemeProvider>
  )
};

export default StyledComponentProvider;