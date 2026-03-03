import Card from '@components/Card';
import Text from '@components/Text';
import CodeBlock from '@components/CodeBlock';

const TEMPLATE = `---
title: "Your Post Title"
excerpt: "A brief summary of the post"
author: "Your Name"
date: "${new Date().toISOString().split('T')[0]}"
tags: ["tag1", "tag2"]
cover_image: ""
---

# Your Post Title

Write your content here using Markdown.

## Section

Paragraphs, **bold**, *italic*, [links](https://example.com), and more.`;

export default function EditorPage() {
  return (
    <Card title="CREATE A NEW POST">
      <Text>To create a new blog post, add a <strong>.md</strong> file inside <code>content/blog/general/</code> using the template below.</Text>
      <br />
      <Text>Steps:</Text>
      <br />
      <Text>1. Copy the template below</Text>
      <Text>2. Create a new file: <code>content/blog/general/your-slug.md</code></Text>
      <Text>3. Paste and edit the content</Text>
      <Text>4. Commit and push to trigger a deploy</Text>
      <br />
      <CodeBlock>{TEMPLATE}</CodeBlock>
    </Card>
  );
}
