import { HttpInterceptorFn } from '@angular/common/http';
import { headers } from '../constants';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ headers }));
};
