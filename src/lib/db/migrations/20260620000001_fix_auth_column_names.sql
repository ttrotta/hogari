ALTER TABLE users RENAME COLUMN email_verified TO "emailVerified";

ALTER TABLE sessions RENAME COLUMN user_id TO "userId";
ALTER TABLE sessions RENAME COLUMN session_token TO "sessionToken";

ALTER TABLE accounts RENAME COLUMN user_id TO "userId";
ALTER TABLE accounts RENAME COLUMN provider_account_id TO "providerAccountId";

ALTER TABLE verification_tokens RENAME TO verification_token;
