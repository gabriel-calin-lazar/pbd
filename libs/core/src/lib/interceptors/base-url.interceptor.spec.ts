import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { baseUrlInterceptor } from './base-url.interceptor';
import { API_BASE_URL } from '@pbd/tokens';

const apiBaseUrl = 'https://api.realworldangular.org';

describe('baseUrlInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: apiBaseUrl },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should prepend apiBaseUrl to requests starting with /api', () => {
    http.get('/api/pizzerias').subscribe();
    const req = httpTesting.expectOne(`${apiBaseUrl}/api/pizzerias`);
    expect(req.request.url).toBe(`${apiBaseUrl}/api/pizzerias`);
    req.flush([]);
  });

  it('should prepend apiBaseUrl to nested /api paths', () => {
    http.get('/api/auth/me').subscribe();
    const req = httpTesting.expectOne(`${apiBaseUrl}/api/auth/me`);
    expect(req.request.url).toBe(`${apiBaseUrl}/api/auth/me`);
    req.flush({});
  });

  it('should not modify requests that do not start with /api', () => {
    http.get('https://photon.komoot.io/api?q=rome').subscribe();
    const req = httpTesting.expectOne('https://photon.komoot.io/api?q=rome');
    expect(req.request.url).toBe('https://photon.komoot.io/api?q=rome');
    req.flush({});
  });
});
