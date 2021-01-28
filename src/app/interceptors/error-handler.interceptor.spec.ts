import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from '../services/http-service.service';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let interceptor: ErrorHandlerInterceptor;
  let spyBsModalService: jasmine.SpyObj<BsModalService>;
  let httpMock: HttpTestingController;
  let httpService: HttpService;

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
    httpService = TestBed.inject(HttpService);
    spyBsModalService.show.and.callThrough();

  })
  );

  it('[ErrorHandlerInterceptor] Should be initialised', () => {
    expect(interceptor).toBeTruthy();
  });

  it('[Intercept] Should call the bsModalService when a HttpErrorResponse is received with a status of 404', (done) => {
    const API = 'https://api.openweathermap.org/data/2.5/forecast?q=Cardiffffff&appid=fe3695759da76e0c9dcaf566634a08ed&units=metric';
    const mockErrorResponse = { status: 404, statusText: 'Bad Request' };
    const data = 'Invalid request parameters';

    httpService.getWeatherData$('Cardiffffff').subscribe(_ => { }, err => {
      expect(err.status).toBe(mockErrorResponse.status);
      expect(err.statusText).toBe(mockErrorResponse.statusText);
      expect(spyBsModalService.show).toHaveBeenCalled();
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
