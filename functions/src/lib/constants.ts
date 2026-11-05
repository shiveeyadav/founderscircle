import { defineString } from 'firebase-functions/params';

/**
 * Public site URL used in emails and push notification links. Set it per
 * project (functions/.env or `firebase deploy` prompt) — nothing here is tied
 * to a particular domain or Firebase project.
 */
export const SITE_URL = defineString('SITE_URL', {
  default: 'http://localhost'
});

/** Region the functions in this project are deployed to (see lib/utils.ts). */
export const FUNCTIONS_REGION = 'asia-southeast2';
