'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import BarLoader from '@/components/BarLoader';
import AlertBanner from '@/components/AlertBanner';
import BlogPost from '@/components/BlogPost';
import styles from './post.module.css';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  cover_image?: string;
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);
    });
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/posts/${slug}`, { cache: 'no-store' });
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to fetch post');
          return;
        }

        setPost(data.post);
      } catch (err) {
        setError('An error occurred while fetching the post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Card title="LOADING...">
          <BarLoader />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Card title="ERROR">
          <AlertBanner>{error}</AlertBanner>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <Card title="NOT FOUND">
          <AlertBanner>Post not found</AlertBanner>
          <Link href="/blog" className={styles.backLink}>
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
        created_at={post.created_at}
        updated_at={post.updated_at}
        tags={post.tags}
        cover_image={post.cover_image}
        content={post.content}
      />
    </div>
  );
}
