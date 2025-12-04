'use client';

import { Amplify } from 'aws-amplify';

let isConfigured = false;

export function configureAmplify() {
  if (isConfigured) return;

  try {
    // Try to load amplify_outputs.json
    const config = require('../../amplify_outputs.json');
    
    Amplify.configure(config, {
      ssr: true // Enable SSR support
    });
    
    isConfigured = true;
    console.log('Amplify configured successfully');
  } catch (error) {
    console.warn('amplify_outputs.json not found, using defaults');
    // Graceful degradation - app will work without Amplify in dev
  }
}

export function isAmplifyConfigured() {
  return isConfigured;
}
