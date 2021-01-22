import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/WeatherData.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private APIKEY = 'fe3695759da76e0c9dcaf566634a08ed';

  constructor(private readonly http: HttpClient) { }

  public getCityData(props: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/forecast?q=${props}&appid=${this.APIKEY}`);
  }
}
