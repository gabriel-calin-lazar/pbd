import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FormRoot } from '@angular/forms/signals';
import { CartStore } from '@pbd/cart';
import { CheckoutWizard } from '../../services/checkout-wizard';
import { Callout } from '@pbd/shared/components/callout';
import { EmptyState } from '@pbd/shared/components/empty-state';
import { CheckoutProgressStepper } from '../../components/checkout-progress-stepper/checkout-progress-stepper';

@Component({
  selector: 'rw-checkout-page',
  imports: [
    RouterLink,
    RouterOutlet,
    DecimalPipe,
    FormRoot,
    Callout,
    EmptyState,
    CheckoutProgressStepper,
  ],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  protected readonly cartStore = inject(CartStore);
  protected readonly wizard = inject(CheckoutWizard);
  private readonly router = inject(Router);

  protected isCurrentStep(step: string): boolean {
    return this.router.url === `/checkout/${step}`;
  }
}
