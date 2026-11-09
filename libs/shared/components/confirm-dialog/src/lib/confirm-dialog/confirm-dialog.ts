import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Button } from '@pbd/shared/components/button';
import { Modal, ModalFooter } from '@pbd/shared/components/modal';

export interface ConfirmDialogData {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export type ConfirmDialogResult = 'confirmed' | 'dismissed';

@Component({
  selector: 'rw-confirm-dialog',
  imports: [Modal, ModalFooter, Button],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  private readonly dialogRef = inject(DialogRef<ConfirmDialogResult>);
  public readonly data = inject<ConfirmDialogData>(DIALOG_DATA);

  protected dismiss(): void {
    this.dialogRef.close('dismissed');
  }

  protected confirm(): void {
    this.dialogRef.close('confirmed');
  }
}
