'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import BlogPostCard from '@/components/BlogPostCard';
import BarLoader from '@/components/BarLoader';
import AlertBanner from '@/components/AlertBanner';

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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts', { cache: 'no-store' });
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to fetch posts');
          return;
        }

        setPosts(data.posts);
      } catch (err) {
        setError('An error occurred while fetching posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Card title="BLOG">
        {loading && <BarLoader />}
        {error && <AlertBanner>{error}</AlertBanner>}

        {!loading && !error && posts.length === 0 && (
          <AlertBanner>
            No posts found. Configure database to see posts here.
          </AlertBanner>
        )}

        {!loading && !error && posts.length > 0 &&
          posts.map((post) => (
            <BlogPostCard key={post.id} {...post} />
          ))
        }
    </Card>
  );
}
