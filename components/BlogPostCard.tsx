import Link from 'next/link';
import Badge from './Badge';
import Card from './Card';
import Text from './Text';

export interface BlogPostCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  created_at?: string;
  tags?: string[];
  cover_image?: string;
}

export default function BlogPostCard({
  slug,
  title,
  excerpt,
  author,
  created_at,
  tags,
  cover_image,
}: BlogPostCardProps) {
  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Card title={<Link href={`/blog/${slug}`} aria-label={`Read full article: ${title}`}>{title}</Link>}>
      {excerpt && <Text>{excerpt}</Text>}
      {(author || formattedDate) && (
        <Text>{[author ? `By ${author}` : null, formattedDate].filter(Boolean).join(' · ')}</Text>
      )}
      {tags && tags.length > 0 && (
        <span aria-label="Article tags">
          {tags.map((tag) => (
            <Badge key={tag}>#{tag}</Badge>
          ))}
        </span>
      )}
    </Card>
  );
}
