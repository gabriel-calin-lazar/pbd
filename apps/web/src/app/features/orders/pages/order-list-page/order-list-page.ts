import { Component, inject, signal, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, DatePipe, DOCUMENT } from '@angular/common';
import { Auth } from '@pbd/auth';
import { OrderApi } from '../../services/order-api';
import { Spinner } from '@pbd/shared/components/spinner';
import { Pagination } from '@pbd/shared/components/pagination';
import { EmptyState } from '@pbd/shared/components/empty-state';
import { Callout } from '@pbd/shared/components/callout';
import { Title } from '@angular/platform-browser';
import { StatusBadge } from '@pbd/shared/components/status-badge';

@Component({
  selector: 'rw-orders-list-page',
  imports: [
    RouterLink,
    DecimalPipe,
    DatePipe,
    Spinner,
    Pagination,
    EmptyState,
    Callout,
    StatusBadge,
  ],
  templateUrl: './order-list-page.html',
  styleUrl: './order-list-page.css',
})
export class OrdersListPage {
  private readonly auth = inject(Auth);
  private readonly orderApi = inject(OrderApi);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);

  protected readonly heading = computed<string>(() =>
    this.auth.isAdmin() ? 'Orders' : 'My Orders',
  );

  protected readonly currentPage = signal(1);
  protected readonly ordersResource = this.orderApi.getOrdersResource(this.currentPage, 10);

  public constructor() {
    effect(() => {
      this.title.setTitle(this.heading());
    });
  }

  protected changePage(page: number): void {
    this.currentPage.set(page);
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
