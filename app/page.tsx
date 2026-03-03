import Link from 'next/link';
import Card from '@components/Card';
import Text from '@components/Text';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <Card title="RADIO-LIB">
      <Text>Welcome to Radio-Lib.</Text>
      <br />
      <Link href="/blog/">GO TO BLOG →</Link>
    </Card>
  );
}

