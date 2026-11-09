import { Component, inject, signal } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { form, FormField, required, email, FormRoot } from '@angular/forms/signals';
import { Auth } from '@pbd/auth';
import { Button } from '@pbd/shared/components/button';
import { Callout } from '@pbd/shared/components/callout';
import { Input } from '@pbd/shared/components/input';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'rw-login-page',
  imports: [RouterLink, FormField, Input, Button, Callout, FormRoot],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected readonly model = signal({ email: '', password: '' });

  protected readonly loginForm = form(
    this.model,
    (schema) => {
      required(schema.email, { message: 'Email is required' });
      email(schema.email, { message: 'Enter a valid email' });
      required(schema.password, { message: 'Password is required' });
    },
    {
      submission: {
        action: async (formRef) => {
          const { email, password } = formRef().value();
          try {
            await firstValueFrom(this.auth.login(email, password));
            void this.router.navigate(['/']);
          } catch {
            return { kind: 'serverError', message: 'Invalid credentials' };
          }
          return null;
        },
      },
    },
  );
}
