import type { Address } from '@pbd/shared/models/adress';
import type { OrderStatus } from '@pbd/shared/components/status-badge';
import type { Pizza } from '../pizzerias/models/pizza.models';

export interface PizzaOrderFormDialogData {
  pizza: Pizza;
  pizzeriaId: string;
  displayPizzeriaName: string;
}

/** Snapshot saved on each order line item at checkout time. */
export type OrderItemSelectedOption =
  | { id: string; type: 'SIZE'; label: string; price: number }
  | { id: string; type: 'TOPPING'; label: string; price: number };

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  selectedOptions: OrderItemSelectedOption[];
  pizza: { id: string; name: string };
}

export interface Order {
  id: string;
  deliveryAddress: Address;
  billingAddress: Address | null;
  notes: string | null;
  tipAmount: number;
  scheduledAt: string | null;
  status: OrderStatus;
  total: number;
  discountAmount: number | null;
  createdAt: string;
  updatedAt: string;
  pizzeria: { id: string; name: string; city: string; country: string };
  client: { id: string; name: string };
  items: OrderItem[];
}

export type AdminOrderListItem = Omit<Order, 'deliveryAddress' | 'billingAddress' | 'notes'>;

export type CouponValidation =
  { valid: false; message: string } | { valid: true; discountPercent: number };
