import { Amplify } from 'aws-amplify';

let outputs: any = {};

// Try to import amplify_outputs.json if it exists
try {
  outputs = require('../../amplify_outputs.json');
  Amplify.configure(outputs);
} catch (error) {
  console.warn('amplify_outputs.json not found, Amplify not configured');
}

export default outputs;
