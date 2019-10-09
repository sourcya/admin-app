import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// const token: string = localStorage.getItem('token');
    @Injectable() export class HttpConfigInterceptor implements HttpInterceptor {
      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (localStorage.getItem('token')) {
          request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')) });
      }
      return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
              }
              return event;
          }));
  }
    }
