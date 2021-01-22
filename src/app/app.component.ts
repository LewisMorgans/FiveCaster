import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from './services/http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public searchForm: FormGroup;
  public searchResult: any
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
    return this.searchForm.controls;
  }

  public searchCityWeather(): any {
    this.submitted = true;

    if (this.validationCheck()) {
      this.httpService
        .getCityData(this.f.searchString.value)
        .subscribe((resp) => {
          console.log(resp.list[0].main);
          this.searchResult = resp.list[0];
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
