import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().describe('Full Name'),
  email: z.string().email().describe('Email Address'),
  role: z.enum(['admin', 'user', 'guest']).default('user').describe('User Role'),
  bio: z.string().max(500).describe('Short Bio').optional()
});
