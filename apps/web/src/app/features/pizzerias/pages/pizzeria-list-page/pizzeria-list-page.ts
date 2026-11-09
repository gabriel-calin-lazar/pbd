import {
  ChangeDetectionStrategy,
  Component,
  computed,
  debounced,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { PizzeriaApi } from '../../services/pizzeria-api';
import { Spinner } from '@pbd/shared/components/spinner';
import { Pagination } from '@pbd/shared/components/pagination';
import { EmptyState } from '@pbd/shared/components/empty-state';
import { HeroBanner } from '@pbd/shared/components/hero-banner';
import { CatalogImageUrlPipe } from '@pbd/shared/pipes/catalog-image-url';
import { FormsModule } from '@angular/forms';
import { Callout } from '@pbd/shared/components/callout';

@Component({
  selector: 'rw-pizzeria-list-page',
  imports: [
    RouterLink,
    NgOptimizedImage,
    Spinner,
    Pagination,
    EmptyState,
    HeroBanner,
    CatalogImageUrlPipe,
    FormsModule,
    Callout,
  ],
  templateUrl: './pizzeria-list-page.html',
  styleUrl: './pizzeria-list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzeriaListPage {
  private readonly document = inject(DOCUMENT);
  private readonly pizzeriaApi = inject(PizzeriaApi);

  // Search input
  protected readonly searchInput = signal('');
  private readonly debouncedSearch = debounced(() => this.searchInput().trim(), 300);
  protected readonly hasActiveSearch = computed<boolean>(
    () => this.debouncedSearch.value().length > 0,
  );

  // Pagination
  protected readonly currentPage = linkedSignal({
    source: this.debouncedSearch.value,
    computation: () => 1,
  });
  protected readonly limit = 12;

  protected readonly pizzeriasResource = this.pizzeriaApi.getPizzeriaListResource(
    this.currentPage,
    this.limit,
    this.debouncedSearch.value,
    this.searchInput,
  );

  protected changePage(page: number): void {
    this.currentPage.set(page);
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
