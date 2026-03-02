import '@root/global.css';
import '@root/global-fonts.css';

import Providers from '@components/Providers';
import Header from '@components/Header';
import Footer from '@components/Footer';

export const metadata = {
  title: 'Radio',
  description: 'Radio - A blog about technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="theme-light">
        <Providers>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 200px)' }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
