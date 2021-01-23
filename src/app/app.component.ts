import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './services/http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public searchForm: FormGroup;
  public selectedForcast = [];
  public submitted = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.intialiseFormState();
  }

  private intialiseFormState(): void {
    this.searchForm = this.fb.group({
      searchString: ['', Validators.required],
    });
  }

  get f(): any {
    // return type?
    console.log(typeof this.searchForm.controls);
    return this.searchForm.controls;
  }

  public searchCityWeather(): void {
    this.selectedForcast = [];
    this.submitted = true;

    if (this.validationCheck()) {
      this.httpService
        .getCityData$(this.f.searchString.value)
        .subscribe((resp) => {
          for (let i = 0; i < resp.list.length; i += 8) {
            const forcast = {
              day: resp.list[i].dt_txt,
              temp: resp.list[i].main.temp,
              speed: resp.list[i].wind.speed,
              description: resp.list[i].weather[0].description,
              icon: resp.list[i].weather[0].icon,
            };
            this.selectedForcast.push(forcast);
          }
        });
    }
  }

  private validationCheck(): boolean {
    if (this.searchForm.valid) {
      return true;
    } else {
      return false;
    }
  }
}
