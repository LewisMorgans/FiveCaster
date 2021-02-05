import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { HttpService } from './services/http-service.service';

describe('[AppComponent Unit Tests]', () => {
  let component: AppComponent;
  let mockFormBuilder = new FormBuilder();
  let mockForm = new FormGroup({});
  let mockHttpService: Partial<HttpService>;
  let serviceSpy: jasmine.SpyObj<{}>;

  beforeEach(waitForAsync(() => {
      mockForm = mockFormBuilder.group({
        searchString: 'Cardiff',
      });

      mockHttpService = {
        // tslint:disable-next-line: deprecation
        getWeatherData$: () => of({
          list: [{
            dt_txt: '24/01/2021',
            length: 40,
            main: {
              temp: 12
            },
            wind: {
              speed: 17
            },
            weather: [{
              description: 'Windy',
              icon: 'ICO011'
            }]
          }]
        })
      };

      TestBed.configureTestingModule({
        providers: [
          AppComponent,
          {provide: FormBuilder, useValue: mockFormBuilder},
          {provide: HttpService, useValue: mockHttpService},
        ],
      }).compileComponents();

      component = TestBed.inject(AppComponent);
      mockFormBuilder = TestBed.inject(FormBuilder);
      mockHttpService = TestBed.inject(HttpService);

      serviceSpy = spyOn(mockHttpService, 'getWeatherData$').and.callThrough();
      component.ngOnInit();
      component.searchForm = mockForm;
    })
  );

  it('[AppComponent] Should create component instance', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('[Form Getter] Should return the form controls object', () => {
    component.ngOnInit();
    expect(component.weatherform).toBeInstanceOf(Object);
  });

  it('[SearchCityWeather] Should call httpService if form is valid', () => {
    component.searchCityWeather();
    expect(serviceSpy).toHaveBeenCalledOnceWith(mockForm.value.searchString);
  });

  it('[SearchCityWeather] Should sort data and push to array', () => {
    component.searchCityWeather();
    mockHttpService.getWeatherData$(mockForm.value.searchString)
      .subscribe(resp => {
        const key = resp.list[0];
        expect(component.retrievedForcast).toEqual([{
          day: key.dt_txt,
          temp: key.main.temp,
          speed: key.wind.speed,
          description: key.weather[0].description,
          icon: key.weather[0].icon
        }]);
      });
  });
});
