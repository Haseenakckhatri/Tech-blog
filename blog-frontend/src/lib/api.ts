import { Post } from '@/types/post';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';

interface StrapiV5Post {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  author: string;
  content: StrapiRichTextContent;
  publishedDate: string;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  coverImage?: StrapiV5CoverImage;
}

interface StrapiV5CoverImage {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    [key: string]: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path?: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiRichTextChild {
  type: string;
  text?: string;
}

interface StrapiRichTextBlock {
  type: string;
  children?: StrapiRichTextChild[];
}

type StrapiRichTextContent = StrapiRichTextBlock[];

function extractTextFromRichContent(content: unknown): string {
  if (!content) {
    return '';
  }
  
  if (typeof content === 'string') {
    return content;
  }
  
  if (Array.isArray(content)) {
    return content
      .map((block: StrapiRichTextBlock) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children
            .map((child: StrapiRichTextChild) => child.text || '')
            .join('');
        }
        return '';
      })
      .join('\n');
  }
  
  return String(content);
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    const url = `${STRAPI_API_URL}/api/posts?populate=*`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url, { 
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('Response not ok:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error('Invalid API response format:', data);
      return [];
    }
    
    const transformedPosts = data.data.map((item: StrapiV5Post): Post => {
      return {
        id: item.id,
        attributes: {
          title: item.title || '',
          slug: item.slug || '',
          author: item.author || '',
          content: extractTextFromRichContent(item.content),
          publishedDate: item.publishedDate || '',
          publishedAt: item.publishedAt || '',
          updatedAt: item.updatedAt || '',
          createdAt: item.createdAt || '',
          documentId: item.documentId,
          coverImage: item.coverImage ? {
            data: {
              id: item.coverImage.id,
              attributes: {
                name: item.coverImage.name,
                url: item.coverImage.url,
                alternativeText: item.coverImage.alternativeText,
                caption: item.coverImage.caption,
                width: item.coverImage.width,
                height: item.coverImage.height,
                formats: item.coverImage.formats
              }
            }
          } : undefined
        }
      };
    });
    
    console.log('Transformed posts:', transformedPosts);
    return transformedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    console.log('Fetching post by slug:', slug);
    
    const url = `${STRAPI_API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch post by slug:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    console.log('Post fetched by slug:', data);
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.error('No post found with slug:', slug);
      return null;
    }
    
    const item = data.data[0] as StrapiV5Post;
    
    // Transform for Strapi v5 format
    const transformedPost: Post = {
      id: item.id,
      attributes: {
        title: item.title || '',
        slug: item.slug || '',
        author: item.author || '',
        content: extractTextFromRichContent(item.content),
        publishedDate: item.publishedDate || '',
        publishedAt: item.publishedAt || '',
        updatedAt: item.updatedAt || '',
        createdAt: item.createdAt || '',
        documentId: item.documentId,
        coverImage: item.coverImage ? {
          data: {
            id: item.coverImage.id,
            attributes: {
              name: item.coverImage.name,
              url: item.coverImage.url,
              alternativeText: item.coverImage.alternativeText,
              caption: item.coverImage.caption,
              width: item.coverImage.width,
              height: item.coverImage.height,
              formats: item.coverImage.formats
            }
          }
        } : undefined
      }
    };
    
    return transformedPost;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}