import { Pipe, PipeTransform, inject } from '@angular/core';
import { API_BASE_URL } from '@pbd/tokens';

export type CatalogImageKind = 'pizzeria' | 'pizza';

@Pipe({
  name: 'catalogImageUrl',
})
export class CatalogImageUrlPipe implements PipeTransform {
  private readonly apiBaseUrl = inject(API_BASE_URL);

  transform(filename: string, kind: CatalogImageKind): string {
    const segment = kind === 'pizzeria' ? 'pizzerias' : 'pizzas';
    return `${this.apiBaseUrl}/images/${segment}/${encodeURIComponent(filename.replace('-1.jpg', '1.png'))}`;
  }
}
