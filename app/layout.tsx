import type { Metadata } from 'next'
import AntdComponentsRegistry from '@/src/lib/AntdRegistry'
import StyledComponentsRegistry from '@/src/lib/StyledComponentRegistry'
import StyledComponentProvider from '@/src/config/styledThemeConfig'
import AntdThemeProvider from '@/src/config/antdThemeConfig'
import { Background } from '@/src/components/Base/index.styled'
import ReactQueryProviders from '@/src/lib/ReactQuery'
import { font } from '@/src/lib/Font'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#A4BFA7" />

        <link rel="shortcut icon" href="/assets/app-icon.ico" />
        <link rel="apple-touch-icon" href="/assets/app-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/app-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/app-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/app-icon.png" />
        <link rel="manifest" href="/assets/manifest.json" />
      </head>
      <body className={font.className}
        style={{ margin: 0 }}>
        <ReactQueryProviders>
          <StyledComponentsRegistry>
            <AntdComponentsRegistry>
              <StyledComponentProvider>
                <AntdThemeProvider>
                  <Background>
                    {children}
                  </Background>
                </AntdThemeProvider>
              </StyledComponentProvider>
            </AntdComponentsRegistry>
          </StyledComponentsRegistry>
        </ReactQueryProviders>
      </body>
    </html>
  )
}
