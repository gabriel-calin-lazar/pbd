import type { Signal } from '@angular/core';

// TODO - move to cart library - cart store should implement this interface and provide it via HEADER_CART injection token
export interface HeaderCart {
  readonly itemCount: Signal<number>;
}
