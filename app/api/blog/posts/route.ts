import { NextRequest, NextResponse } from 'next/server';
import { getPosts as getNotionPosts } from '@/lib/notion';
import { getAllRows } from '@/lib/db';

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

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const source = searchParams.get('source') || 'auto'; // 'auto', 'notion', 'local'

    let posts: Post[] = [];

    // Intentar obtener de Notion primero si está configurado
    if ((source === 'auto' || source === 'notion') && process.env.NOTION_DATABASE_ID) {
      try {
        const notionPosts = await getNotionPosts(limit);
        if (notionPosts.length > 0) {
          posts = notionPosts;
        }
      } catch (error) {
        console.log('Notion no disponible, usando posts locales');
      }
    }

    // Si no hay posts de Notion, obtener de SQLite local
    if (posts.length === 0 && (source === 'auto' || source === 'local')) {
      const rows = await getAllRows<any>(
        'SELECT id, title, slug, content, excerpt, author, created_at, updated_at, tags FROM posts WHERE published = 1 ORDER BY created_at DESC'
      );

      posts = rows.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        content: row.content,
        excerpt: row.excerpt,
        author: row.author,
        created_at: row.created_at,
        updated_at: row.updated_at,
        tags: row.tags ? row.tags.split(',') : [],
      }));

      if (limit) {
        posts = posts.slice(0, limit);
      }
    }

    return NextResponse.json(
      {
        posts,
        total: posts.length,
        source: posts.length > 0 ? (source === 'auto' ? 'auto-detected' : source) : 'none',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
