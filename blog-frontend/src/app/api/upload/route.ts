import { uploadFile } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API route called');
    
    const formData = await request.formData();
    console.log('Form data fields:', Array.from(formData.keys()));
    
    const file = formData.get('file') as File | null;
    
    if (!file) {
      const filesField = formData.get('files') as File | null;
      if (filesField) {
        console.log('File found under "files" field instead of "file"');
        const result = await uploadFile(filesField);
        return NextResponse.json({ 
          success: true, 
          message: 'File uploaded successfully',
          data: result 
        });
      }
      
      console.error('No file found in request');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    console.log('File received:', file.name, 'Size:', file.size, 'Type:', file.type);

    try {
      console.log('Uploading file to Strapi...');
      const result = await uploadFile(file);
      console.log('Upload result:', result);

      return NextResponse.json({ 
        success: true, 
        message: 'File uploaded successfully',
        data: result 
      });
    } catch (uploadError) {
      console.error('Strapi upload error:', uploadError);
      throw uploadError;
    }
  } catch (error) {
    console.error('File upload error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false 
      },
      { status: 500 }
    );
  }
}