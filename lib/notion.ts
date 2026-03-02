import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

/**
 * Check if Notion is properly configured with real credentials
 */
const isNotionConfigured = () => {
  return (
    DATABASE_ID &&
    DATABASE_ID !== 'your-notion-database-id' &&
    process.env.NOTION_API_KEY &&
    process.env.NOTION_API_KEY !== 'your-notion-api-key'
  );
};

export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published: boolean;
  author?: string;
  created_at?: string;
  updated_at?: string;
  cover_image?: string;
  tags?: string[];
}

/**
 * Fetch all published posts from Notion
 */
export async function getPosts(limit?: number): Promise<NotionPost[]> {
  if (!isNotionConfigured()) {
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'created_at',
          direction: 'descending',
        },
      ],
    });

    const posts = response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.title?.title?.[0]?.plain_text || 'Untitled',
      slug: page.properties.slug?.rich_text?.[0]?.plain_text || page.id,
      content: page.properties.content?.rich_text?.[0]?.plain_text || '',
      excerpt: page.properties.excerpt?.rich_text?.[0]?.plain_text || '',
      published: page.properties.published?.checkbox || false,
      author: page.properties.author?.rich_text?.[0]?.plain_text || '',
      created_at: page.properties.created_at?.created_time,
      updated_at: page.properties.updated_at?.last_edited_time,
      cover_image: page.cover?.external?.url || page.cover?.file?.url || '',
      tags: page.properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
    }));

    return limit ? posts.slice(0, limit) : posts;
  } catch (error) {
    console.error('Error fetching posts from Notion:', error);
    return [];
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<NotionPost | null> {
  if (!isNotionConfigured()) {
    return null;
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page: any = response.results[0];
    return {
      id: page.id,
      title: page.properties.title?.title?.[0]?.plain_text || 'Untitled',
      slug: page.properties.slug?.rich_text?.[0]?.plain_text || page.id,
      content: page.properties.content?.rich_text?.[0]?.plain_text || '',
      excerpt: page.properties.excerpt?.rich_text?.[0]?.plain_text || '',
      published: page.properties.published?.checkbox || false,
      author: page.properties.author?.rich_text?.[0]?.plain_text || '',
      created_at: page.properties.created_at?.created_time,
      updated_at: page.properties.updated_at?.last_edited_time,
      cover_image: page.cover?.external?.url || page.cover?.file?.url || '',
      tags: page.properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
    };
  } catch (error) {
    console.error('Error fetching post from Notion:', error);
    return null;
  }
}

/**
 * Get total count of published posts
 */
export async function getPostCount(): Promise<number> {
  if (!isNotionConfigured()) {
    return 0;
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'published',
        checkbox: {
          equals: true,
        },
      },
    });

    return response.results.length;
  } catch (error) {
    console.error('Error fetching post count from Notion:', error);
    return 0;
  }
}
