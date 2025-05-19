import { Post } from '@/types/post';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

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

// API response interfaces
interface StrapiV5Response<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Create post data interface
interface CreatePostData {
  title: string;
  content: string;
  slug: string;
  author: string;
  publishedDate?: string;
  category?: string;
  tags?: string[];
  coverImage?: number;
}

// Update post data interface
interface UpdatePostData {
  title?: string;
  content?: string;
  slug?: string;
  author?: string;
  publishedDate?: string;
  category?: string;
  tags?: string[];
  coverImage?: number;
}

// Contact form data interface
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

// Upload response interface
interface UploadResponse {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: null;
  createdAt: string;
  updatedAt: string;
}

// Error with cause interface
interface ErrorWithCause extends Error {
  cause?: unknown;
}

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

// Convert text content back to Strapi v5 rich text format
function convertToRichTextContent(content: string): StrapiRichTextContent {
  // Split content by newlines and create paragraphs
  const paragraphs = content.split('\n').filter(paragraph => paragraph.trim());
  
  return paragraphs.map(paragraph => ({
    type: 'paragraph',
    children: [
      {
        type: 'text',
        text: paragraph.trim()
      }
    ]
  }));
}

// Generic API client
class StrapiV5Client {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string, token?: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private getHeaders(contentType = 'application/json'): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': contentType,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`GET request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // POST request
  async post<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`POST request failed: ${response.statusText}`, { cause: errorData });
    }

    return response.json();
  }

  // POST with FormData (for file uploads)
  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const headers: Record<string, string> = {};
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`POST FormData request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // PUT request (for updates)
  async put<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`PUT request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`DELETE request failed: ${response.statusText}`);
    }

    return response.json();
  }
}

// Initialize the client
const api = new StrapiV5Client(STRAPI_API_URL, STRAPI_API_TOKEN);

// Transform Strapi v5 response to your Post format
function transformPostFromStrapi(item: StrapiV5Post): Post {
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
}

// Existing GET functions
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

    const data = await response.json() as StrapiV5Response<StrapiV5Post[]>;
    console.log('API Response:', JSON.stringify(data, null, 2));
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error('Invalid API response format:', data);
      return [];
    }
    
    const transformedPosts = data.data.map((item: StrapiV5Post) => transformPostFromStrapi(item));
    
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

    const data = await response.json() as StrapiV5Response<StrapiV5Post[]>;
    console.log('Post fetched by slug:', data);
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.error('No post found with slug:', slug);
      return null;
    }
    
    const item = data.data[0];
    return transformPostFromStrapi(item);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

/**
 * Creates a new post in the Strapi CMS
 * 
 * @param postData The post data to create
 * @returns A promise that resolves to the created post response
 */
export async function createPost(postData: CreatePostData): Promise<StrapiV5Response<StrapiV5Post>> {
  try {
    // Prepare the post data without rich text conversion
    const strapiData = {
      ...postData,
      // Send plain text content directly
      content: postData.content,
      // Ensure we have a published date
      publishedDate: postData.publishedDate || new Date().toISOString().split('T')[0],
    };
    
    console.log('Creating post with data structure:', { data: strapiData });
    
    try {
      // First attempt with plain text content
      const result = await api.post<StrapiV5Response<StrapiV5Post>>('/api/posts', { data: strapiData });
      console.log('Post created successfully:', result);
      return result;
    } catch (firstError) {
      console.warn('First attempt failed, trying alternative format:', firstError);
      
      // Second attempt with rich text format
      try {
        const richTextContent = convertToRichTextContent(postData.content);
        
        const alternativeData = {
          ...postData,
          content: richTextContent,
          publishedDate: postData.publishedDate || new Date().toISOString().split('T')[0],
        };
        
        console.log('Trying with rich text format:', { data: alternativeData });
        const result = await api.post<StrapiV5Response<StrapiV5Post>>('/api/posts', { data: alternativeData });
        console.log('Post created successfully with rich text format:', result);
        return result;
      } catch (secondError) {
        console.error('Second attempt failed, trying third approach:', secondError);
        
        // Third attempt with minimal structured content
        const minimalStructuredData = {
          ...postData,
          content: {
            data: postData.content
          },
          publishedDate: postData.publishedDate || new Date().toISOString().split('T')[0],
        };
        
        console.log('Trying with minimal structured content:', { data: minimalStructuredData });
        const result = await api.post<StrapiV5Response<StrapiV5Post>>('/api/posts', { data: minimalStructuredData });
        console.log('Post created successfully with minimal structured content:', result);
        return result;
      }
    }
  } catch (error) {
    // Log detailed error information
    console.error('Error creating post:', error);
    
    if (error instanceof Error && 'cause' in error) {
      console.error('Error cause:', (error as ErrorWithCause).cause);
    }
    
    // Make a direct request for detailed error info
    try {
      const response = await fetch(`${STRAPI_API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(STRAPI_API_TOKEN ? { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` } : {})
        },
        body: JSON.stringify({ 
          data: {
            ...postData,
            publishedDate: postData.publishedDate || new Date().toISOString().split('T')[0],
          } 
        })
      });
      
      const responseText = await response.text();
      console.log('Direct Strapi error details:', responseText);
    } catch (directError) {
      console.error('Error with direct request:', directError);
    }
    
    throw error;
  }
}

export async function updatePost(documentId: string, postData: UpdatePostData): Promise<StrapiV5Response<StrapiV5Post>> {
  try {
    // Convert content to rich text format if provided
    const strapiData: Record<string, unknown> = {};
    
    if (postData.content !== undefined) {
      strapiData.content = postData.content; // Send as plain text first
    }
    
    // Copy other fields
    (Object.keys(postData) as Array<keyof UpdatePostData>).forEach(key => {
      if (key !== 'content' && postData[key] !== undefined) {
        strapiData[key] = postData[key];
      }
    });
    
    console.log('Updating post with data:', strapiData);
    
    try {
      const result = await api.put<StrapiV5Response<StrapiV5Post>>(`/api/posts/${documentId}`, strapiData);
      console.log('Post updated:', result);
      return result;
    } catch (firstError) {
      console.warn('Update with plain text failed, trying rich text:', firstError);
      
      if (postData.content !== undefined) {
        strapiData.content = convertToRichTextContent(postData.content);
      }
      
      const result = await api.put<StrapiV5Response<StrapiV5Post>>(`/api/posts/${documentId}`, strapiData);
      console.log('Post updated with rich text:', result);
      return result;
    }
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function deletePost(documentId: string): Promise<StrapiV5Response<StrapiV5Post>> {
  try {
    console.log('Deleting post:', documentId);
    const result = await api.delete<StrapiV5Response<StrapiV5Post>>(`/api/posts/${documentId}`);
    console.log('Post deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export async function uploadFile(file: File): Promise<UploadResponse[]> {
  try {
    const formData = new FormData();
    formData.append('files', file); // Strapi expects 'files' as the field name
    
    console.log('Uploading file to Strapi:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    // Check if the API token is available
    if (!STRAPI_API_TOKEN) {
      console.warn('Warning: STRAPI_API_TOKEN is not set!');
    } else {
      console.log('API token is available and will be used for authentication');
    }
    
    // Set up headers with the API token
    const headers: Record<string, string> = {};
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    console.log('Sending request to:', `${STRAPI_API_URL}/api/upload`);
    
    // Make the request to Strapi
    const response = await fetch(`${STRAPI_API_URL}/api/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    // If the response is not OK, handle the error
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload error response:', errorText);
      
      let errorMessage = `Upload failed with status ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorMessage;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
      }
      
      throw new Error(errorMessage);
    }
    
    // Parse the successful response
    const result = await response.json();
    console.log('File uploaded successfully, response:', result);
    
    return result;
  } catch (error) {
    console.error('Error in uploadFile function:', error);
    throw error;
  }
}

// Contact form submission
export async function submitContactForm(formData: ContactFormData): Promise<StrapiV5Response<ContactFormData & { submittedAt: string }>> {
  try {
    const data = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };
    
    console.log('Submitting contact form:', data);
    const result = await api.post<StrapiV5Response<ContactFormData & { submittedAt: string }>>('/api/contacts', data);
    console.log('Contact form submitted:', result);
    
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

export async function subscribeNewsletter(email: string): Promise<StrapiV5Response<{ email: string; subscribedAt: string }>> {
  try {
    const data = {
      email,
      subscribedAt: new Date().toISOString(),
    };
    
    console.log('Subscribing to newsletter:', email);
    const result = await api.post<StrapiV5Response<{ email: string; subscribedAt: string }>>('/api/newsletter-subscriptions', data);
    console.log('Newsletter subscription:', result);
    
    return result;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}

export { api as strapiClient };
export function formatStrapiError(error: unknown): string {
  if (error instanceof Error) {
    const errorWithCause = error as Error & { 
      cause?: { 
        error?: { 
          message?: string; 
          details?: { errors?: Array<{ message: string }> } 
        } 
      } 
    };
    
    if (errorWithCause.cause?.error) {
      const strapiError = errorWithCause.cause.error;
      if (strapiError.message) {
        return strapiError.message;
      }
      if (strapiError.details?.errors) {
        return strapiError.details.errors.map((e: { message: string }) => e.message).join(', ');
      }
    }
    
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  
  return 'An error occurred';
}

export { fetchPostBySlug as getPost, fetchPosts as getPosts };

export async function getCategories(): Promise<StrapiV5Response<unknown[]>> {
  try {
    const result = await api.get<StrapiV5Response<unknown[]>>('/api/categories');
    return result;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { data: [] };
  }
}