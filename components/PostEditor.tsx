'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import AlertBanner from '@/components/AlertBanner';
import styles from './PostEditor.module.css';

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-markdown-editor').then(mod => mod.default), {
  ssr: false,
  loading: () => <textarea className={styles.fallbackTextarea} placeholder="Enter markdown content..." />,
});

interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string;
  cover_image: string;
  content: string;
}

export default function PostEditor() {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    tags: '',
    cover_image: '',
    content: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-'),
      }));
    }
  };

  const handleContentChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      content: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (!formData.title || !formData.slug || !formData.content) {
        setError('Title, slug, and content are required');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create post');
        return;
      }

      setMessage('Post created successfully! Redirecting to blog...');
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        tags: '',
        cover_image: '',
        content: '',
      });

      setTimeout(() => {
        window.location.href = '/blog/';
      }, 2000);
    } catch (err) {
      setError('An error occurred while creating the post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Card title="CREATE POST">
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <AlertBanner>{error}</AlertBanner>}
          {message && <AlertBanner>{message}</AlertBanner>}

          <div className={styles.formGroup}>
            <label htmlFor="title">Title *</label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Post title"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="slug">Slug *</label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="post-slug"
              required
            />
            <small>Auto-generated from title</small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="excerpt">Excerpt</label>
            <Input
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief summary of the post"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="author">Author</label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date">Date</label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tags">Tags (comma-separated)</label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="javascript, react, nextjs"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cover_image">Cover Image URL</label>
            <Input
              id="cover_image"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Content (Markdown) *</label>
            <div className={styles.editorWrapper}>
              <MDEditor
                value={formData.content}
                onChange={(val) => handleContentChange(val || '')}
                height={'400px' as any}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

