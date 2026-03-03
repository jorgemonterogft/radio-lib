import Link from 'next/link';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Radio</h1>
      <p>Redirecting to blog...</p>
      <Link href="/blog/">Go to Blog</Link>
    </div>
  );
}

