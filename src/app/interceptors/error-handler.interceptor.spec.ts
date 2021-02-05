import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpService } from '../services/http-service.service';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { ErrorHandlerService } from '../services/error-handler.service';

describe('ErrorHandlerInterceptor', () => {
  let interceptor: ErrorHandlerInterceptor;
  let errorHandlerServiceMock;
  let httpMock: HttpTestingController;
  let httpService: HttpService;

  beforeEach(waitForAsync(() => {

    errorHandlerServiceMock = {
      errorHandler: () => {

      }
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ErrorHandlerInterceptor,
        HttpService,
        { provide: ErrorHandlerService, useValue: errorHandlerServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true
        }
      ]
    }).compileComponents();

    interceptor = TestBed.inject(ErrorHandlerInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpService);
    errorHandlerServiceMock = TestBed.inject(ErrorHandlerService);

  })
  );

  it('[ErrorHandlerInterceptor] Should be initialised', () => {
    expect(interceptor).toBeTruthy();
  });

  it('[Intercept] Should call the bsModalService when a HttpErrorResponse is received with a status of 404', (done) => {
    const API = 'https://api.openweathermap.org/data/2.5/forecast?q=Cardiffffff&appid=fe3695759da76e0c9dcaf566634a08ed&units=metric';
    const mockErrorResponse = { status: 404, statusText: 'Bad Request' };
    const data = 'Invalid request parameters';
    const serviceSpy = spyOn(errorHandlerServiceMock, 'errorHandler').and.callThrough();

    httpService.getWeatherData$('Cardiffffff').subscribe(_ => { }, err => {
      expect(err.status).toBe(mockErrorResponse.status);
      expect(err.statusText).toBe(mockErrorResponse.statusText);
      expect(serviceSpy).toHaveBeenCalled();
      done();
    });

    const req = httpMock
      .expectOne({
        url: API,
        method: 'GET',
      })
      .flush(data, mockErrorResponse);

  });

});
