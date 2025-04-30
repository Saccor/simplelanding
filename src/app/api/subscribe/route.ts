import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple email subscription endpoint 
 * Receives email data and returns a success response
 * In a real application, you would integrate with your preferred email service provider
 */
export async function POST(request: NextRequest) {
  try {
    // Extract the email and additional fields from the request body
    const body = await request.json();
    const { email, fields } = body;
    
    if (!email) {
      return NextResponse.json({ 
        error: 'Email is required' 
      }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 });
    }
    
    console.log('Email subscription received:', email, fields);
    
    // In a real application, you would:
    // 1. Store the email in your database
    // 2. Send the data to your email marketing service
    // 3. Handle GDPR/compliance requirements
    
    // Return a success response
    return NextResponse.json({
      success: true,
      message: 'Email subscription received'
    });
    
  } catch (error: any) {
    console.error('Error in subscribe API:', error);
    
    return NextResponse.json({
      error: 'Server error processing subscription',
      details: error.message
    }, { status: 500 });
  }
} 