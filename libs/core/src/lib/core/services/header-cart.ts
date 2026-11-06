import { InjectionToken } from '@angular/core';
import type { HeaderCart } from '../models/header-cart.model';

export const HEADER_CART = new InjectionToken<HeaderCart>('HEADER_CART');
