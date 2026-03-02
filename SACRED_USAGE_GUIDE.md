# Sacred Components - Quick Usage Guide

## Overview
This guide shows how to use Sacred components that have been integrated into the blog platform.

## Common Components

### Block - Layout Container
Used for divs, sections, and layout containers.

```tsx
import Block from '@/components/Block';

<Block className={styles.container}>
  <Text>Content here</Text>
</Block>
```

### Text - Typography
Used for headings, paragraphs, labels, and spans.

```tsx
import Text from '@/components/Text';

// Heading
<Text as="h1">Main Title</Text>
<Text as="h2">Subtitle</Text>

// Paragraph
<Text>Regular paragraph text</Text>

// Label
<Text as="label" htmlFor="email">Email</Text>
```

### Button - Interactive Controls
```tsx
import Button from '@/components/Button';

<Button onClick={handleClick}>
  Click Me
</Button>

// With variant
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>

// Disabled state
<Button disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

### Input - Form Fields
```tsx
import Input from '@/components/Input';

<Input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.currentTarget.value)}
  required
/>

// With label
<Block className={styles.formGroup}>
  <Text as="label" htmlFor="name">Name</Text>
  <Input
    id="name"
    type="text"
    placeholder="Your name"
  />
</Block>
```

### Card - Content Container
```tsx
import Card from '@/components/Card';

<Card className={styles.postCard}>
  <Text as="h3">Card Title</Text>
  <Text>Card content goes here</Text>
</Card>
```

### Badge - Tags and Labels
```tsx
import Badge from '@/components/Badge';

<Badge>Tag Name</Badge>
<Badge className={styles.tag}>#technology</Badge>
```

### BarLoader - Loading Indicator
```tsx
import BarLoader from '@/components/BarLoader';

{loading && <BarLoader />}
```

### AlertBanner - Status Messages
```tsx
import AlertBanner from '@/components/AlertBanner';

{error && <AlertBanner type="error">{error}</AlertBanner>}
{success && <AlertBanner type="success">{success}</AlertBanner>}
{info && <AlertBanner type="info">{info}</AlertBanner>}
{warning && <AlertBanner type="warning">{warning}</AlertBanner>}
```

## Form Pattern Example

```tsx
'use client';

import { useState } from 'react';
import Block from '@/components/Block';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import AlertBanner from '@/components/AlertBanner';

export default function MyForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Your submission logic here
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        setError('Something went wrong');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Block>
      <Text as="h1">My Form</Text>
      
      {error && <AlertBanner type="error">{error}</AlertBanner>}
      
      <form onSubmit={handleSubmit}>
        <Block className={styles.formGroup}>
          <Text as="label" htmlFor="email">Email</Text>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="your@email.com"
            required
          />
        </Block>
        
        <Button disabled={loading} type="submit">
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Block>
  );
}
```

## Blog Post Card Example

```tsx
import Link from 'next/link';
import Card from '@/components/Card';
import Text from '@/components/Text';
import Block from '@/components/Block';
import Badge from '@/components/Badge';

export default function BlogPostCard({ post }) {
  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card>
      {post.cover_image && (
        <Block className={styles.coverImage}>
          <img src={post.cover_image} alt={post.title} />
        </Block>
      )}
      
      <Block className={styles.content}>
        <Text as="h3">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </Text>
        
        {post.excerpt && <Text>{post.excerpt}</Text>}
        
        <Block className={styles.meta}>
          {post.author && <Text>By {post.author}</Text>}
          {date && <Text>{date}</Text>}
        </Block>
        
        {post.tags && post.tags.length > 0 && (
          <Block className={styles.tags}>
            {post.tags.map(tag => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </Block>
        )}
        
        <Link href={`/blog/${post.slug}`}>
          <Text>Read More →</Text>
        </Link>
      </Block>
    </Card>
  );
}
```

## CSS Module Integration

Sacred components work seamlessly with CSS Modules:

```css
/* MyComponent.module.css */
.container {
  padding: 2rem;
  gap: 1rem;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.postCard {
  border-radius: 0;
  background: var(--background);
}
```

## Important Notes

1. **Client Components**: Always use `'use client'` for components with hooks
2. **Props**: Check component documentation for available props
3. **Styling**: Use `className` prop with CSS Modules or inline `style` prop
4. **Variants**: Some components have `variant` prop for styling options
5. **Types**: Import component types for TypeScript support

## Available Components in This Project

- ✅ **Block** - Container/layout
- ✅ **Text** - Typography
- ✅ **Button** - Interactive button
- ✅ **Input** - Form input
- ✅ **Card** - Content card
- ✅ **Badge** - Label/tag
- ✅ **BarLoader** - Loading bar
- ✅ **AlertBanner** - Status message
- 🔄 **Navigation** - (not yet used, available)
- 🔄 **Dialog** - (available)
- 🔄 **Dropdown** - (available)
- 🔄 **Table** - (available)

## Further Reading

For more components and examples, check:
- `/components/` folder for all available components
- `/app/page.tsx` for the design system showcase (kitchen sink)
- Sacred documentation in component files

---

**Status**: Ready to use
**Last Updated**: 2026-02-19
