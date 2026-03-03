import Avatar from '@components/Avatar';
import Badge from '@components/Badge';
import BreadCrumbs from '@components/BreadCrumbs';
import CardDouble from '@components/CardDouble';
import Divider from '@components/Divider';
import Indent from '@components/Indent';
import Text from '@components/Text';

interface BlogPostProps {
  title: string;
  slug?: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  cover_image?: string;
  content: string;
}

function formatDate(value?: string) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return value;
  }
}

export default function BlogPost({ title, slug, author, created_at, updated_at, tags, cover_image, content }: BlogPostProps) {
  const created = formatDate(created_at);
  const updated = formatDate(updated_at);

  return (
    <CardDouble title={title.toUpperCase()}>
      <BreadCrumbs
        items={[
          { name: 'Radio-Lib', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: title },
        ]}
      />

      <Avatar src={cover_image}>
        <Indent>
          {author ? author.toUpperCase() : 'UNKNOWN AUTHOR'}
          <br />
          {created || 'DATE UNKNOWN'}
        </Indent>
      </Avatar>

      {updated && <Text>Updated: {updated}</Text>}

      {tags && tags.length > 0 && (
        <span aria-label="post tags">
          {tags.map((tag) => (
            <Badge key={tag}>#{tag}</Badge>
          ))}
        </span>
      )}

      <Divider type="DOUBLE" />

      <Text dangerouslySetInnerHTML={{ __html: content }} />

      <Divider />

      <a href="/blog">← BACK TO INDEX</a>
    </CardDouble>
  );
}
