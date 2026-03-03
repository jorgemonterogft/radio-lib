'use client';

import { useState } from 'react';
import Card from '@components/Card';
import Button from '@components/Button';
import Input from '@components/Input';
import TextArea from '@components/TextArea';
import AlertBanner from '@components/AlertBanner';
import styles from '@components/PostEditor.module.css';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      content: e.currentTarget.value,
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

  return (
    <Card title="CREATE POST">
      <form className={styles.root} onSubmit={handleSubmit}>
        <p className={styles.description}>Write and publish a new blog post. The slug is auto-generated from the title.</p>

        {error && <AlertBanner>{error}</AlertBanner>}
        {message && <AlertBanner>{message}</AlertBanner>}

        <div className={styles.section}>
          <Input autoComplete="off" label="TITLE" placeholder="Post title" name="title" value={formData.title} onChange={handleInputChange} required />
          <Input autoComplete="off" label="SLUG" placeholder="auto-generated-from-title" name="slug" value={formData.slug} onChange={handleInputChange} required />
          <Input autoComplete="off" label="EXCERPT" placeholder="Brief summary of the post" name="excerpt" value={formData.excerpt} onChange={handleInputChange} />
          <Input autoComplete="off" label="AUTHOR" placeholder="Your name" name="author" value={formData.author} onChange={handleInputChange} />
          <Input autoComplete="off" label="DATE" placeholder="YYYY-MM-DD" name="date" value={formData.date} onChange={handleInputChange} />
          <Input autoComplete="off" label="TAGS" placeholder="javascript, react, nextjs (comma-separated)" name="tags" value={formData.tags} onChange={handleInputChange} />
          <Input autoComplete="off" label="COVER IMAGE URL" placeholder="https://example.com/image.jpg" name="cover_image" value={formData.cover_image} onChange={handleInputChange} />
        </div>

        <div className={styles.section}>
          <p className={styles.label}>CONTENT (MARKDOWN)</p>
          <TextArea placeholder="Write your content in Markdown..." name="content" value={formData.content} onChange={handleContentChange} required />
        </div>

        <div className={styles.actions}>
          <Button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating post...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

