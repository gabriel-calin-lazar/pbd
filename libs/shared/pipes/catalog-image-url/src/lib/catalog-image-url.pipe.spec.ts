import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { API_BASE_URL } from '@pbd/tokens';
import { CatalogImageUrlPipe } from './catalog-image-url.pipe';

describe('CatalogImageUrlPipe', () => {
  const apiBaseUrl = 'https://api.realworldangular.org';
  let pipe: CatalogImageUrlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogImageUrlPipe, { provide: API_BASE_URL, useValue: apiBaseUrl }],
    });
    pipe = TestBed.inject(CatalogImageUrlPipe);
  });

  it('should build a pizzeria image URL', () => {
    const result = pipe.transform('my-pizzeria.jpg', 'pizzeria');
    expect(result).toBe(`${apiBaseUrl}/images/pizzerias/my-pizzeria.jpg`);
  });

  it('should build a pizza image URL', () => {
    const result = pipe.transform('margherita.png', 'pizza');
    expect(result).toBe(`${apiBaseUrl}/images/pizzas/margherita.png`);
  });

  it('should encode special characters in the filename', () => {
    const result = pipe.transform('my pizza #1.jpg', 'pizza');
    expect(result).toContain(encodeURIComponent('my pizza #1.jpg'));
  });

  it('should use the pizzerias segment for pizzeria kind', () => {
    const result = pipe.transform('test.jpg', 'pizzeria');
    expect(result).toContain('/images/pizzerias/');
  });

  it('should use the pizzas segment for pizza kind', () => {
    const result = pipe.transform('test.jpg', 'pizza');
    expect(result).toContain('/images/pizzas/');
  });
});
