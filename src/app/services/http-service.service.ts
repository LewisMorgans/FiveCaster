import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WeatherData} from '../models/WeatherData.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  //  Be aware you should never store an API key inside the client of your application like this.

  private APIKEY = 'fe3695759da76e0c9dcaf566634a08ed';
  private endPoint = 'https://api.openweathermap.org/data/2.5/forecast?';

  constructor(private readonly http: HttpClient) {
  }

  public getWeatherData$(city: string): Observable<WeatherData> {

    const httpParams = new HttpParams({
      fromObject: {
        q: city,
        appid: this.APIKEY,
        units: 'metric'
      }
    });

    return this.http.get<WeatherData>(this.endPoint, {params: httpParams});
  }
}
