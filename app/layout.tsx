import '@root/global.css';
import '@root/global-fonts.css';

import Providers from '@components/Providers';

export const metadata = {
  title: 'Sacred Blog',
  description: 'A blog built with Next.js and React',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="theme-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
