import axios from 'axios';
import { MAILERLITE_API_KEY } from '../config/mailerLite';

// Type definitions for subscriber data
export interface SubscriberData {
  email: string;
  name?: string;
  fields?: Record<string, string | number | boolean>;
  status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
}

// Create axios instance with base configuration for MailerLite API v2
const mailerLiteClient = axios.create({
  baseURL: 'https://connect.mailerlite.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${MAILERLITE_API_KEY}`
  }
});

// Create alternative client for MailerLite API (older version)
const mailerLiteClassicClient = axios.create({
  baseURL: 'https://api.mailerlite.com/api/v2',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-MailerLite-ApiKey': MAILERLITE_API_KEY
  }
});

// Log API initialization (without exposing the key)
console.log(`MailerLite API initialized with ${MAILERLITE_API_KEY ? 'a valid' : 'missing'} API key`);
console.log('Using API key (first 10 chars):', MAILERLITE_API_KEY ? MAILERLITE_API_KEY.substring(0, 10) + '...' : 'undefined');

/**
 * Add a subscriber to MailerLite using the subscribers endpoint
 * Will try both API versions to maximize chances of success
 * 
 * @param subscriberData - The subscriber data to add
 * @returns Promise with the response data or error
 */
export const addSubscriber = async (subscriberData: SubscriberData): Promise<any> => {
  try {
    console.log('Starting addSubscriber with data:', JSON.stringify(subscriberData));
    
    // This is crucial - properly format according to MailerLite API requirements
    const payload = {
      email: subscriberData.email,
      fields: subscriberData.fields || {},
      status: subscriberData.status || 'active'
    };
    
    // First try using the new API
    try {
      console.log('Trying new API (v2)...');
      console.log('Sending to MailerLite API with payload:', JSON.stringify(payload));
      
      const response = await mailerLiteClient.post('/subscribers', payload);
      
      console.log('MailerLite API response status:', response.status);
      console.log('MailerLite API response data:', JSON.stringify(response.data));
      
      return response.data;
    } catch (newApiError: any) {
      console.log('New API failed:', newApiError.message);
      
      // If the new API fails, try the classic API
      console.log('Trying classic API...');
      
      // Classic API has a different payload format
      const classicPayload = {
        email: subscriberData.email,
        fields: subscriberData.fields || {},
        type: subscriberData.status || 'active'
      };
      
      const classicResponse = await mailerLiteClassicClient.post('/subscribers', classicPayload);
      console.log('MailerLite Classic API response status:', classicResponse.status);
      console.log('MailerLite Classic API response data:', JSON.stringify(classicResponse.data));
      
      return classicResponse.data;
    }
  } catch (error: any) {
    console.error('Error adding subscriber to MailerLite (both APIs failed):', error.message);
    if (error.response) {
      console.error('API Error details:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
    throw error;
  }
};

// Export a simplified version of addSubscriberToGroup that actually just calls addSubscriber
// This maintains compatibility with existing code
export const addSubscriberToGroup = async (
  groupId: string,
  subscriberData: SubscriberData
): Promise<any> => {
  console.log(`Group functionality disabled - adding subscriber without group`);
  return addSubscriber(subscriberData);
};

/**
 * Get all subscribers
 * 
 * @param limit - The number of subscribers to return (default: 25)
 * @param page - The page number to return (default: 1)
 * @returns Promise with the response data or error
 */
export const getSubscribers = async (limit: number = 25, page: number = 1): Promise<any> => {
  try {
    const response = await mailerLiteClient.get('/subscribers', {
      params: { limit, page }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting subscribers from MailerLite:', error);
    throw error;
  }
};

/**
 * Get a specific subscriber by email
 * 
 * @param email - The email of the subscriber to get
 * @returns Promise with the response data or error
 */
export const getSubscriber = async (email: string): Promise<any> => {
  try {
    const response = await mailerLiteClient.get(`/subscribers/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting subscriber ${email} from MailerLite:`, error);
    throw error;
  }
};

export default {
  addSubscriber,
  addSubscriberToGroup,
  getSubscribers,
  getSubscriber
}; 