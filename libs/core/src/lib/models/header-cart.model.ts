import type { Signal } from '@angular/core';

export interface HeaderCart {
  readonly itemCount: Signal<number>;
}
