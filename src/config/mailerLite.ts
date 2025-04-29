// MailerLite credentials configuration

// Direct API Method - If environment variable isn't set, use the hardcoded key as fallback
const API_KEY_FALLBACK = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNjQ3MzliMzA5YmJjODRhYjdlY2U1MjcyMzFkZThlYTc1NjQ4ZjQ3ZGIzYmZiNmZmMWM5N2M0OWQ4NGE3NTM0YTEzNTJkYzA3YzFiM2E3MWEiLCJpYXQiOjE3NDU5NjI2MzYuOTcyNjY2LCJuYmYiOjE3NDU5NjI2MzYuOTcyNjY5LCJleHAiOjQ5MDE2MzYyMzYuOTY2Njc4LCJzdWIiOiIxNTAwNDM0Iiwic2NvcGVzIjpbXX0.nqR3-Nq0ZJRGOqTsDBWdrrS3PG_UM7ghkFLcWs-b9tQBnat7Zg0QWcQjSdm5oT0FJti0HhhFoIoET8TLzpy0NFH4QY-TncqdmjZRSH9eAYzR2f4GuQbwBtQRTUVKyuZOJ7IL8hxBcNTAnbkAh8UTb6uAPdqopHHxqipn5NoBYNNG_wNw3bnKgT05C2jbFa4K9QfKN_JQhBNIrYZ-G0rjB8MN4KuprcxcAIYMKqD4MHWVTIAgk9iSFPoRD77-viLOwGNyA2RU66xJ46KMsqWj_xG1uWKJNurQkCITev-g7v7ewWQcTPxjQbmEhFJX-KPY7WJOb3w55iCN0qCxnf1ogUCuRuCcyv9ymdo4yOJalUXM8LrKQ3sq-eDFUvV-tN0KoHhlY-MwrNY6izP5xFNJ5eAn6pOUP4AlngJGTl9QkEp9Y-8-YN9h1vmI0xwIzrGYGdBNVwDmdJaKfgo4edSQpsBmDpTkivMKdoivAomrmrYQQhr9jSXXGzeEOm1M32AYYLZWUIprBT8OP5-c7HFuTjhdzsS7L4Q9LRUxX6xfX2tExZjKW8VW_KRNsLPFVW5Ca-rGvHeaZE2UhABAmhnB3yQMvPknScE8dW826TRmjquiN2Y3lURAFiJggXWyYNyUOq8nXm98gFr22829k58G5W7CazisbSWrGOg-OT4FTFY";

// Debug helpers to print actual key values
const ENV_API_KEY = process.env.MAILERLITE_API_KEY;
const ENV_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

console.log("Environment variables check:");
console.log("- API Key from env:", ENV_API_KEY ? "Set (first chars: " + ENV_API_KEY.substring(0, 10) + "...)" : "Not set");
console.log("- Group ID from env:", ENV_GROUP_ID || "Not set");

export const MAILERLITE_API_KEY = ENV_API_KEY || API_KEY_FALLBACK;
export const MAILERLITE_GROUP_ID = ENV_GROUP_ID || '153054000726410998';

// Embedded Form Method
export const MAILERLITE_ACCOUNT_ID = process.env.NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID || '';
export const MAILERLITE_FORM_ID = process.env.NEXT_PUBLIC_MAILERLITE_FORM_ID || '';

// Which method to use (true = embedded form, false = direct API)
export const USE_EMBEDDED_FORM = false;

export default {
  MAILERLITE_API_KEY,
  MAILERLITE_GROUP_ID,
  MAILERLITE_ACCOUNT_ID,
  MAILERLITE_FORM_ID,
  USE_EMBEDDED_FORM
}; 