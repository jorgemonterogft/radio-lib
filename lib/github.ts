import { Octokit } from '@octokit/rest';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'jorgemonterogft';
const REPO_NAME = 'radio-lib';

if (!GITHUB_TOKEN) {
  console.warn('GITHUB_TOKEN environment variable not set');
}

const octokit = GITHUB_TOKEN
  ? new Octokit({ auth: GITHUB_TOKEN })
  : null;

export interface CreatePostOptions {
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  date?: string;
  tags?: string[];
  cover_image?: string;
  content: string;
}

export async function createPostOnGitHub(options: CreatePostOptions): Promise<string> {
  if (!octokit) {
    throw new Error('GitHub token not configured. Please set GITHUB_TOKEN environment variable.');
  }

  const { title, slug, excerpt, author, date, tags, cover_image, content } = options;

  // Create frontmatter
  const frontmatter = `---
title: "${title}"
excerpt: "${excerpt || ''}"
author: "${author || 'Anonymous'}"
date: "${date || new Date().toISOString()}"
tags: ${JSON.stringify(tags || [])}
cover_image: "${cover_image || ''}"
---

`;

  const fileContent = frontmatter + content;
  const filePath = `content/blog/general/${slug}.md`;

  try {
    // Get current file SHA if it exists (for update)
    let sha: string | undefined;
    try {
      const existingFile = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: filePath,
      });

      if (existingFile.data && 'sha' in existingFile.data) {
        sha = (existingFile.data as { sha: string }).sha;
      }
    } catch (err) {
      // File doesn't exist, that's fine
    }

    // Create or update file
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `feat: add blog post "${title}"`,
      content: Buffer.from(fileContent).toString('base64'),
      ...(sha && { sha }),
    });

    if (response.data.commit && response.data.commit.sha) {
      return response.data.commit.sha;
    }

    return 'success';
  } catch (error) {
    console.error('Error creating post on GitHub:', error);
    throw new Error('Failed to create post on GitHub');
  }
}
