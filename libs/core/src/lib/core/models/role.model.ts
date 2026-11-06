export const Role = {
  CUSTOMER: 'CUSTOMER',
  PIZZERIA_ADMIN: 'PIZZERIA_ADMIN',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
