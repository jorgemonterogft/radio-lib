import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import Card from '@components/Card';
import BlogPostCard from '@components/BlogPostCard';
import AlertBanner from '@components/AlertBanner';
import matter from 'gray-matter';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  created_at?: string;
  tags?: string[];
  cover_image?: string;
}

export const dynamic = 'force-static';

function getBlogPosts(): BlogPost[] {
  const postsDirectory = join(process.cwd(), 'content', 'blog');
  const posts: BlogPost[] = [];

  try {
    const categories = readdirSync(postsDirectory);

    categories.forEach((category) => {
      const categoryPath = join(postsDirectory, category);
      const files = readdirSync(categoryPath).filter(file => file.endsWith('.md') && !file.startsWith('_'));

      files.forEach((file) => {
        const filePath = join(categoryPath, file);
        const fileContent = readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        const slug = file.replace('.md', '');

        posts.push({
          id: slug,
          title: data.title || 'Untitled',
          slug: slug,
          excerpt: data.excerpt || '',
          author: data.author || 'Anonymous',
          created_at: data.date || new Date().toISOString(),
          tags: data.tags || [],
          cover_image: data.cover_image || '',
        });
      });
    });

    return posts.sort((a, b) => 
      new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    );
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <Card title="BLOG">
        {posts.length === 0 && (
          <AlertBanner>No posts found.</AlertBanner>
        )}

        {posts.length > 0 &&
          posts.map((post) => (
            <BlogPostCard key={post.id} {...post} />
          ))
        }
    </Card>
  );
}

