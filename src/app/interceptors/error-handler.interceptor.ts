import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.bsModalRef = this.modalService.show(ErrorModalComponent);
        return throwError(err);
      })
    );
  }
}
