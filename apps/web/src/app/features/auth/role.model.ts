// TODO extract to shared lib - not nested under auth feature
export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  PIZZERIA_ADMIN: 'PIZZERIA_ADMIN',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
