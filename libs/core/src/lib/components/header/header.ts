import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '@pbd/auth';
import { Avatar } from '@pbd/shared/components/avatar';
import { PizzaLogo } from '@pbd/shared/components/pizza-logo';
import { HEADER_CART } from '@pbd/cart';
import { RoleDirective } from '../../directives/role.directive';

@Component({
  selector: 'rw-header',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, Avatar, PizzaLogo, RoleDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly auth = inject(Auth);
  protected readonly cartStore = inject(HEADER_CART);
  private readonly document = inject(DOCUMENT);

  protected readonly isMobileMenuOpen = signal(false);

  @HostListener('document:keydown.escape')
  public onDocumentEscape(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  public constructor() {
    effect(() => {
      const open = this.isMobileMenuOpen();
      this.document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
