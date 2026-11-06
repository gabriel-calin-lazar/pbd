import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_BASE_URL } from '../tokens/api-base-url';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/api')) {
    const apiReq = req.clone({ url: `${inject(API_BASE_URL)}${req.url}` });
    return next(apiReq);
  }
  return next(req);
};
