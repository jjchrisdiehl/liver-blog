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
  width?: number;
  height?: number;
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

async function fetchEmdash<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
    },
  });

  if (!res.ok) {
    throw new Error(`Emdash API error on ${endpoint}: ${res.statusText}`);
  }

  return res.json();
}

export async function getPosts(): Promise<Post[]> {
  const data = await fetchEmdash<any>("/posts");
  return data.posts || data;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const data = await fetchEmdash<any>(`/posts/${slug}`);
  return data.post || data;
}

export async function getPages(): Promise<Page[]> {
  const data = await fetchEmdash<any>("/pages");
  return data.pages || data;
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const data = await fetchEmdash<any>(`/pages/${slug}`);
  return data.page || data;
}
