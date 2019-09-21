import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GetDataService } from '../services/get-data.service';
// const jwt = localStorage.getItem('token');
const token: string = localStorage.getItem('token');
    @Injectable() export class HttpConfigInterceptor implements HttpInterceptor {
    //   constructor(private authenticationService: GetDataService) {}
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
    //     if (!!jwt) {
    //      req = req.clone({
    //        setHeaders: {
    //          Authorization: `Bearer ${jwt}`
    //        }
    //      });
    //    }
    //    return next.handle(req);
    //  }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   

      if (token) {
          request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }

    //   if (!request.headers.has('Content-Type')) {
    //       request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    //   }

    //   request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

      return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                //   console.log('event--->>>', event);
              }
              return event;
          }));
  }
    }
