import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

// Instantiate JwtHelperService
const jwtHelper = new JwtHelperService();

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  // Check if window and localStorage are available (in the browser)
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const authResponse = JSON.parse(storedUser);
      const token = authResponse.token;

      if (token && !jwtHelper.isTokenExpired(token)) {
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(clonedReq);
      }
    }
  }

  return next(req);
};
