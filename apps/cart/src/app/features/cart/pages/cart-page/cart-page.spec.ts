import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NO_ERRORS_SCHEMA, computed, signal } from '@angular/core';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { API_BASE_URL } from '@pbd/core';
import { Auth } from '@pbd/auth';
import { CartData, CartStore } from '@pbd/cart-store';
import { CartPage } from './cart-page';

const mockCartData: CartData = {
  pizzeria: { id: 'p1', name: 'Roma', image: 'roma.jpg' },
  items: [
    {
      id: 'item1',
      pizza: { id: 'pizza1', name: 'Margherita', image: 'marg.jpg', basePrice: 9.5 },
      quantity: 2,
      size: null,
      extraToppings: [],
      totalPrice: 19,
    },
  ],
  total: 19,
};

const cartDataSignal = signal<CartData | null>(null);
const isEmptySignal = signal(true);
const isLoadingSignal = signal(false);

const cartStoreStub = {
  cart: cartDataSignal,
  isEmpty: isEmptySignal,
  isLoading: isLoadingSignal,
  itemCount: computed(() => cartDataSignal()?.items.reduce((s, i) => s + i.quantity, 0) ?? 0),
  pizzeria: signal(null),
  items: signal([]),
  clear: (): void => {
    // noop
  },
  updateQuantity: (): void => {
    // noop
  },
  removeItem: (): void => {
    // noop
  },
};

const authStub = { user: signal(null), isAuthenticated: signal(false) };

describe('CartPage', () => {
  let fixture: ComponentFixture<CartPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    cartDataSignal.set(null);
    isEmptySignal.set(true);
    isLoadingSignal.set(false);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: CartStore, useValue: cartStoreStub },
        { provide: Auth, useValue: authStub },
        { provide: API_BASE_URL, useValue: 'https://api.realworldangular.org' },
      ],
    }).overrideComponent(CartPage, { set: { schemas: [NO_ERRORS_SCHEMA] } });

    fixture = TestBed.createComponent(CartPage);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture = null as never;
  });

  it('should show empty state when cart is empty', () => {
    expect(el.querySelector('rw-empty-state')).not.toBeNull();
  });

  it('should show loading spinner when cart is loading and no data yet', async () => {
    isEmptySignal.set(false);
    isLoadingSignal.set(true);
    await fixture.whenStable();
    expect(el.querySelector('[aria-label="Loading cart"]')).not.toBeNull();
  });

  it('should render cart items when cart has data', async () => {
    isEmptySignal.set(false);
    cartDataSignal.set(mockCartData);
    await fixture.whenStable();
    expect(el.textContent).toContain('Roma');
    expect(el.textContent).toContain('Margherita');
  });

  it('should show pizzeria name in the ordering from section', async () => {
    isEmptySignal.set(false);
    cartDataSignal.set(mockCartData);
    await fixture.whenStable();
    expect(el.textContent).toContain('Ordering from');
  });
});
