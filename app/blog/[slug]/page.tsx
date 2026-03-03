import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Card from '@/components/Card';
import AlertBanner from '@/components/AlertBanner';
import BlogPost from '@/components/BlogPost';
import styles from './post.module.css';

interface BlogPostData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author?: string;
  date?: string;
  tags?: string[];
  cover_image?: string;
}

export const dynamic = 'force-static';

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const postsDirectory = join(process.cwd(), 'content', 'blog');
  const params: Array<{ slug: string }> = [];

  try {
    const categories = readdirSync(postsDirectory);

    categories.forEach((category) => {
      const categoryPath = join(postsDirectory, category);
      const files = readdirSync(categoryPath).filter(file => file.endsWith('.md'));

      files.forEach((file) => {
        const slug = file.replace('.md', '');
        params.push({ slug });
      });
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
  }

  return params;
}

function getBlogPost(slug: string): BlogPostData | null {
  const postsDirectory = join(process.cwd(), 'content', 'blog');

  try {
    const categories = readdirSync(postsDirectory);

    for (const category of categories) {
      const categoryPath = join(postsDirectory, category);
      const filePath = join(categoryPath, `${slug}.md`);

      try {
        const fileContent = readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        return {
          title: data.title || 'Untitled',
          slug: slug,
          content: content,
          excerpt: data.excerpt || '',
          author: data.author || 'Anonymous',
          date: data.date || new Date().toISOString(),
          tags: data.tags || [],
          cover_image: data.cover_image || '',
        };
      } catch {
        continue;
      }
    }
  } catch (error) {
    console.error('Error reading blog post:', error);
  }

  return null;
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return (
      <div className={styles.container}>
        <Card title="NOT FOUND">
          <AlertBanner>Post not found</AlertBanner>
          <Link href="/blog/" className={styles.backLink}>
            ← Back to Blog
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BlogPost
        title={post.title}
        slug={post.slug}
        author={post.author}
        created_at={post.date}
        updated_at={post.date}
        tags={post.tags}
        cover_image={post.cover_image}
        content={post.content}
      />
    </div>
  );
}
