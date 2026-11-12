/// <reference types="astro/client" />

const API_URL = import.meta.env.EMDASH_API_URL;
const API_KEY = import.meta.env.EMDASH_API_KEY;

export interface Author {
  name: string;
  avatar?: string;
}

export interface TaxonomyItem {
  id: string;
  name: string;
  slug: string;
}

export interface EmdashMedia {
  url: string;
  altText?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  featuredImage?: EmdashMedia;
  author?: Author;
  categories?: TaxonomyItem[];
  tags?: TaxonomyItem[];
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  featuredImage?: EmdashMedia;
}

// Fallback mock data for local theme testing when Emdash API is unreachable
const MOCK_POSTS: Post[] = [
  {
    id: "1",
    slug: "welcome-to-liver-blog",
    title: "Welcome to Liver Blog",
    excerpt:
      "Testing out the Astro + Vite + Emdash starter architecture with CSS Modules and fluid typography.",
    content:
      "<p>This is a local fallback post so you can style your typography, blockquotes, and code blocks before connecting your live Emdash instance.</p><blockquote>Design tokens and fluid clamp() scales make responsive layouts effortless.</blockquote>",
    publishedAt: new Date().toISOString(),
    author: { name: "Chris" },
    categories: [{ id: "c1", name: "Engineering", slug: "engineering" }],
    tags: [
      { id: "t1", name: "Astro", slug: "astro" },
      { id: "t2", name: "Vite", slug: "vite" },
    ],
  },
];

const MOCK_PAGES: Page[] = [
  {
    id: "p1",
    slug: "about",
    title: "About Liver Blog",
    content:
      "<p>This is a sample regular page template fetched via the Emdash pages endpoint.</p>",
  },
];

async function fetchEmdash<T>(endpoint: string): Promise<T | null> {
  if (!API_URL || API_URL.includes("your-emdash-instance.com")) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
      },
    });

    if (!res.ok) throw new Error(`Emdash API error: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.warn(
      `[Emdash Fallback] Could not reach ${API_URL}${endpoint}, using mock data.`,
    );
    return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  const data = await fetchEmdash<any>("/posts");
  return data ? data.posts || data : MOCK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const data = await fetchEmdash<any>(`/posts/${slug}`);
  return data ? data.post || data : MOCK_POSTS.find((p) => p.slug === slug);
}

export async function getPages(): Promise<Page[]> {
  const data = await fetchEmdash<any>("/pages");
  return data ? data.pages || data : MOCK_PAGES;
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  const data = await fetchEmdash<any>(`/pages/${slug}`);
  return data ? data.page || data : MOCK_PAGES.find((p) => p.slug === slug);
}
