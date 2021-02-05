import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './services/http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public searchForm: FormGroup;
  public retrievedForcast = [];
  public submitted = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.intialiseFormState();
  }

  public intialiseFormState(): void {
    this.searchForm = this.fb.group({
      searchString: ['', Validators.required]
    });
  }

  public get weatherform(): any {
    return this.searchForm.controls;
  }

  public searchCityWeather(): void {
    this.retrievedForcast = [];
    this.submitted = true;

    if (this.searchForm.valid) {
      const weatherUpdate = 8;
      this.httpService.getWeatherData$((this.weatherform.searchString.value))
        .subscribe((resp) => {
          for (let i = 0; i < resp.list.length; i += weatherUpdate) {
            const key = resp.list[i];
            const forecast = {
              day: key.dt_txt,
              temp: key.main.temp,
              speed: key.wind.speed,
              description: key.weather[0].description,
              icon: key.weather[0].icon,
            };
            this.retrievedForcast.push(forecast);
          }
        });
    }
  }
}
