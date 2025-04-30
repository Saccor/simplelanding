import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get API keys from environment variables
    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;
    const endpoint = 'https://connect.mailerlite.com/api/subscribers';

    // Verify API key exists
    if (!apiKey) {
      console.error('MailerLite API key not found in environment variables');
      return NextResponse.json(
        { message: 'Server configuration error.' },
        { status: 500 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { email } = body;
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Prepare the payload for MailerLite
    type MailerLitePayload = {
      email: string;
      fields: {
        source: string;
        signup_date: string;
      };
      groups?: string[];
    };

    const payload: MailerLitePayload = {
      email,
      fields: {
        source: 'website_signup',
        signup_date: new Date().toISOString()
      }
    };

    // Add to group if group ID is provided
    if (groupId) {
      payload.groups = [groupId];
    }

    // Send the request to MailerLite
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    // Parse the response
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Subscription failed.' },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: 'Subscribed successfully.' },
      { status: 200 }
    );
  } catch (error) {
    // Log the error and return a friendly message
    console.error('Subscription error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
} 