import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '@pbd/auth';
import { Avatar } from '@pbd/shared/components/avatar';
import { Button } from '@pbd/shared/components/button';

@Component({
  selector: 'rw-profile-page',
  imports: [Button, Avatar],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private readonly auth = inject(Auth);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isLoggingOut = signal(false);
  protected readonly user = this.auth.user;

  protected logout(): void {
    this.isLoggingOut.set(true);
    this.auth
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          window.location.href = '/';
        },
      });
  }
}
