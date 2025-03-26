import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Providers from '@/providers';
import RootHeader from '@/app/components/RootHeader';
import './global.css';
import CategoryNavigation from '@/app/components/navigation/CategoryNavigation';
import { NotionStoreProvider } from '@/app/stores/notion-store-provider';
import CategoryNavigationLayout from '@/app/components/navigation/CategoryNavigationLayout';

const jua = Open_Sans({
  variable: '--font-jua',
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SB Notes | 심명보 기술 블로그',
  description: '안녕하세요. 웹 프론트엔드 개발자 심명보입니다.',
  other: {
    viewport:
      'width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'SB Notes | 심명보 기술 블로그',
    description: '안녕하세요. 웹 프론트엔드 개발자 심명보입니다.',
    locale: 'kr_KR',
    type: 'website',
  },
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" style={{ colorScheme: 'light' }}>
      <body className={`${jua.className}`}>
        <Providers>
          <NotionStoreProvider>
            <RootHeader />
            <CategoryNavigationLayout>
              <CategoryNavigation />
            </CategoryNavigationLayout>
            <main
              className={
                'w-full h-full lg:ps-[var(--side-nav-width)] pt-[var(--header-height)]'
              }
            >
              {modal}
              {children}
            </main>
          </NotionStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
