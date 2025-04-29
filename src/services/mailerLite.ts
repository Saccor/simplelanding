import axios from 'axios';

// This constant should be replaced with your actual MailerLite API key
// In a production environment, this should be loaded from an environment variable
const MAILERLITE_API_KEY = 'your_mailerlite_api_key';
const MAILERLITE_GROUP_ID = 'your_group_id'; // Replace with your actual group ID

// Type definitions for subscriber data
export interface SubscriberData {
  email: string;
  name?: string;
  fields?: Record<string, string | number | boolean>;
  status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
}

// Create axios instance with base configuration
const mailerLiteClient = axios.create({
  baseURL: 'https://connect.mailerlite.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${MAILERLITE_API_KEY}`
  }
});

/**
 * Add a subscriber to MailerLite
 * 
 * @param subscriberData - The subscriber data to add
 * @returns Promise with the response data or error
 */
export const addSubscriber = async (subscriberData: SubscriberData): Promise<any> => {
  try {
    const response = await mailerLiteClient.post('/subscribers', subscriberData);
    return response.data;
  } catch (error) {
    console.error('Error adding subscriber to MailerLite:', error);
    throw error;
  }
};

/**
 * Add a subscriber to a specific group in MailerLite
 * 
 * @param groupId - The ID of the group to add the subscriber to
 * @param subscriberData - The subscriber data to add
 * @returns Promise with the response data or error
 */
export const addSubscriberToGroup = async (
  groupId: string = MAILERLITE_GROUP_ID,
  subscriberData: SubscriberData
): Promise<any> => {
  try {
    const response = await mailerLiteClient.post(`/groups/${groupId}/subscribers`, subscriberData);
    return response.data;
  } catch (error) {
    console.error(`Error adding subscriber to group ${groupId}:`, error);
    throw error;
  }
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