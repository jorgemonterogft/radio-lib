import { NextRequest, NextResponse } from 'next/server';
import { createPostOnGitHub } from '@/lib/github';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, slug, excerpt, author, date, tags, cover_image, content } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { error: 'Slug can only contain lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    // Create post on GitHub
    const commitSha = await createPostOnGitHub({
      title,
      slug,
      excerpt,
      author,
      date,
      tags,
      cover_image,
      content,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Post created successfully',
        commitSha,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);

    const message = error instanceof Error ? error.message : 'Failed to create post';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
