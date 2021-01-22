export interface WeatherData {
  list: {
    main: {
      temp: number;
    };
    wind: {
      speed: number;
    };
    weather: {
      description: string;
      icon: string;
    };
  };
}
