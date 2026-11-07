import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { PizzaLogo } from '@pbd/shared/components/pizza-logo';

@Component({
  selector: 'rw-hero-banner',
  imports: [PizzaLogo, NgOptimizedImage],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.css',
})
export class HeroBanner {
  public readonly editionVariant = 'Slice-Based';
}
