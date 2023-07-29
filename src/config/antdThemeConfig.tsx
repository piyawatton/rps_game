'use client'
import { FC, PropsWithChildren } from 'react';
import { ConfigProvider, ThemeConfig as ThemeConfigType, Watermark } from 'antd';
import theme from './theme.json';
import { font } from '../lib/Font';

const antdTheme: ThemeConfigType = {
  token: {
    fontSize: 18,
    fontFamily: font.style.fontFamily,
    colorPrimary: theme.primaryColor,
    colorText: theme.textPrimaryColor,
    colorFillSecondary: theme.secondaryColor,
    colorLink: theme.secondaryColor,
    boxShadow: `
      0 1px 2px -2px ${theme.secondaryColor}29, 
      0 3px 6px 0 ${theme.secondaryColor}1F, 
      0 5px 12px 4px ${theme.secondaryColor}17
    `,
  },
  components: {
    Layout: {
      colorBgHeader: theme.primaryColor,
    },
  },
};

const AntdThemeProvider: FC<PropsWithChildren> = (props) => {
  return (
    <ConfigProvider theme={antdTheme}>
      {props.children}
    </ConfigProvider>
  )
}

export default AntdThemeProvider;
