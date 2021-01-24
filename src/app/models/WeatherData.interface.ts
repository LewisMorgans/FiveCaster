export interface WeatherData {
  list: [{
    dt_txt: string;
    length: number;
    main: {
      temp: number;
    };
    wind: {
      speed: number;
    };
    weather: [{
      description: string;
      icon: string;
    }];
  }];
}