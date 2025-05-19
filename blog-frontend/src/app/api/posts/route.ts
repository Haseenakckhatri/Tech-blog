import { createPost, formatStrapiError, updatePost } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

// types for the request bodies
interface CreatePostRequest {
  data: {
    title: string;
    content: string;
    slug: string;
    author: string;
    publishedDate: string;
    coverImage: number;
  };
}

interface UpdatePostRequest {
  data: {
    title?: string;
    content?: string;
    slug?: string;
    author?: string;
    publishedDate?: string;
    coverImage?: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/posts - Creating new post');
    
    const rawText = await request.text();
    console.log('Raw request body:', rawText);
    
    let requestBody;
    try {
      requestBody = JSON.parse(rawText) as CreatePostRequest;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }
    
    const { data } = requestBody;
    
    if (!data) {
      return NextResponse.json(
        { error: 'Missing data payload in the request body' },
        { status: 400 }
      );
    }
    
    const { title, content, slug, author, publishedDate, coverImage } = data;
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }
    
    if (!author) {
      return NextResponse.json(
        { error: 'Author is required' },
        { status: 400 }
      );
    }
    
    if (!publishedDate) {
      return NextResponse.json(
        { error: 'Published date is required' },
        { status: 400 }
      );
    }
    
    if (!coverImage) {
      return NextResponse.json(
        { error: 'Cover image is required' },
        { status: 400 }
      );
    }
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { error: 'Slug must contain only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }
    const strapiData = {
      title,
      content,
      slug,
      author,
      publishedDate,
      coverImage,
    };
    
    console.log('Sending to createPost with data:', strapiData);
    try {
      const result = await createPost(strapiData);
      console.log('Post created successfully:', result);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Post created successfully',
        data: result 
      });
    } catch (createError) {
      console.error('Error from createPost:', createError);
      throw createError;
    }
  } catch (error) {
    console.error('Post creation error:', error);
    if (error instanceof Error && error.message.includes('slug')) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      );
    }
    
    const errorMessage = formatStrapiError(error);
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false 
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('documentId');
    
    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required for updates' },
        { status: 400 }
      );
    }

    const rawText = await request.text();
    console.log('Raw request body for update:', rawText);
    
    let requestBody;
    try {
      requestBody = JSON.parse(rawText) as UpdatePostRequest;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }
    
    const { data } = requestBody;
    
    if (!data) {
      return NextResponse.json(
        { error: 'Missing data payload in the request body' },
        { status: 400 }
      );
    }
    if (data.slug) {
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(data.slug)) {
        return NextResponse.json(
          { error: 'Slug must contain only lowercase letters, numbers, and hyphens' },
          { status: 400 }
        );
      }
    }
    
    const strapiData: Record<string, unknown> = {};
    if (data.title !== undefined) strapiData.title = data.title;
    if (data.content !== undefined) strapiData.content = data.content;
    if (data.slug !== undefined) strapiData.slug = data.slug;
    if (data.author !== undefined) strapiData.author = data.author;
    if (data.publishedDate !== undefined) strapiData.publishedDate = data.publishedDate;
    if (data.coverImage !== undefined) strapiData.coverImage = data.coverImage;
    
    console.log('Sending to updatePost with data:', strapiData);
    
    const result = await updatePost(documentId, strapiData);

    return NextResponse.json({ 
      success: true, 
      message: 'Post updated successfully',
      data: result 
    });
  } catch (error) {
    console.error('Post update error:', error);
    
    if (error instanceof Error && error.message.includes('slug')) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      );
    }
    
    const errorMessage = formatStrapiError(error);
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false 
      },
      { status: 500 }
    );
  }
}