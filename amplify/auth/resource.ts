import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      required: true,
    },
    email: {
      required: true,
    },
    givenName: {
      required: false,
    },
  },
  groups: ['Admins', 'TeamAdmins'],
});