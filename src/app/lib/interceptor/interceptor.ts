import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Injectable()

export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(
        private loaderService: LoaderService,
        private router: Router,
        private toast: ToastService,

    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (localStorage.getItem('token')) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')) });
        }

        this.loaderService.showLoader();

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }

                this.loaderService.hideLoader();

                return event;
            }),
            catchError((error: HttpErrorResponse) => {

                // console.log("error", error);

                this.loaderService.hideLoader();

                if (error.status === 401) {
                    this.router.navigate(['login']);
                }
                else if (error.status === 404) {
                    this.toast.show(error.error.message);
                }
                else if (error.status === 422) {
                    if (error.error.errors) {
                        let val: any;
                        for (val of Object.values(error.error.errors)) {
                            for (let v of val) {
                                this.toast.show(v);
                            }
                        }
                    } else {
                        this.toast.show(error.error.message);
                    }
                }
                else if (error.status === 500) {
                    this.toast.show(error.error.message);
                }
                else {
                    this.router.navigate(['login']);                    
                }

                return throwError(error);
            })

        );
    }


}   