import { Component } from '@angular/core';
import { PizzaLogo } from '../../../shared/components/pizza-logo/pizza-logo';

@Component({
  selector: 'rw-hero-banner',
  imports: [PizzaLogo],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.css',
})
export class HeroBanner {
  public readonly editionVariant = 'Demo';
}
