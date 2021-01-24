import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { throwError } from 'rxjs';
import { HttpService } from '../services/http-service.service';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let interceptor: ErrorHandlerInterceptor;
  let spyBsModalService: jasmine.SpyObj<BsModalService>;
  // tslint:disable-next-line: prefer-const
  let httpServiceMock: Partial<HttpService>;
  let httpMock: HttpTestingController;
  let httpRequestSpy;
  let httpHandlerSpy;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('BsModalService', ['show']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ErrorHandlerInterceptor,
        HttpService,
        { provide: BsModalService, useValue: spy },
        { provide: HttpService, useValue: httpServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true
        }
      ]
    }).compileComponents();

    interceptor = TestBed.inject(ErrorHandlerInterceptor);
    spyBsModalService = TestBed.inject(BsModalService) as jasmine.SpyObj<BsModalService>;
    httpMock = TestBed.inject(HttpTestingController);
    httpServiceMock = TestBed.inject(HttpService);
    spyBsModalService.show.and.callThrough();


  })
  );

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('testy test', fakeAsync(() => {
    httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError({ error: { message: 'test-error' } }));

    interceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(_ => { }, err => {
        expect(err).toEqual({ error: { message: 'test-error' } });
        expect(spyBsModalService.show).toHaveBeenCalled();
      });

  }));
});
