import { Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { CheckoutWizard } from '../../services/checkout-wizard';
import { PhotonLocationField } from '@pbd/shared/components/photon-location-field';
import { Input } from '@pbd/shared/components/input';
import { Button } from '@pbd/shared/components/button';

@Component({
  selector: 'rw-checkout-delivery-step',
  imports: [FormField, Input, Button, PhotonLocationField],
  templateUrl: './checkout-delivery-step.html',
  styleUrl: './checkout-delivery-step.css',
})
export class CheckoutDeliveryStep {
  protected readonly wizard = inject(CheckoutWizard);

  protected async goNext(): Promise<void> {
    await this.wizard.validateStep('delivery');
  }
}
