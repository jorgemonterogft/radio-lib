import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug as getNotionPostBySlug } from '@/lib/notion';
import { getRow } from '@/lib/db';

interface Post {
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const source = new URL(req.url).searchParams.get('source') || 'auto';

    let post: Post | null = null;

    // Intentar obtener de Notion primero si está configurado
    if ((source === 'auto' || source === 'notion') && process.env.NOTION_DATABASE_ID) {
      try {
        const notionPost = await getNotionPostBySlug(slug);
        if (notionPost) {
          post = notionPost;
        }
      } catch (error) {
        console.log('Notion no disponible, intentando SQLite local');
      }
    }

    // Si no hay post de Notion, obtener de SQLite local
    if (!post && (source === 'auto' || source === 'local')) {
      const row = await getRow<any>(
        'SELECT id, title, slug, content, excerpt, author, created_at, updated_at, tags FROM posts WHERE slug = ? AND published = 1',
        [slug]
      );

      if (row) {
        post = {
          id: row.id,
          title: row.title,
          slug: row.slug,
          content: row.content,
          excerpt: row.excerpt,
          author: row.author,
          created_at: row.created_at,
          updated_at: row.updated_at,
          tags: row.tags ? row.tags.split(',') : [],
        };
      }
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        post,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}
