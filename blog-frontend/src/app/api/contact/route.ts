import { formatStrapiError, submitContactForm } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactFormRequest;
    const { firstName, lastName, email, subject, message } = body;
    
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Submit to Strapi
    const result = await submitContactForm({
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      data: result 
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    
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