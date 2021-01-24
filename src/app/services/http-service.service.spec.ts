import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpService } from './http-service.service';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';

describe('HttpService Test', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  })
  );

  it('Should make a GET request to the API and return mock data', () => {
    const API = 'https://api.openweathermap.org/data/2.5/forecast?q=Cardiff&appid=fe3695759da76e0c9dcaf566634a08ed&units=metric';
    const city = 'Cardiff';

    service.getWeatherData$(city)
      .subscribe((resp) => {
        expect(resp).toEqual({ main: { temp: 32 } } as any);
      });

    const req = httpMock
      .expectOne({
        url: API,
        method: 'GET',
      })
      .flush({ main: { temp: 32 } });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
