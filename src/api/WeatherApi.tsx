import { WeatherApiResult } from "../types/WeatherApiResult";

export interface IWeatherApi {
  getForecastAndCurrentWeather(name: string): Promise<WeatherApiResult>;
  getForecastAndCurrentWeatherUsingCoords(
    lat: number,
    long: number,
  ): Promise<WeatherApiResult>;
}

export default class WeatherApi implements IWeatherApi {
  private readonly apiKey: string;
  private readonly base = "https://api.openweathermap.org";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getForecastAndCurrentWeather(name: string): Promise<WeatherApiResult> {
    const response = await fetch(
      `${this.base}/data/2.5/weather?units=METRIC&q=${name}&appid=${this.apiKey}`,
    );

    if (response.status === 404) {
      throw Error(`Could not find town, city or postcode ${name}.`);
    } else if (!response.ok) {
      throw Error(
        `Error fetching current weather. Response code ${response.status}`,
      );
    }
    const data = await response.json();
    const oneCallData = await this.getOneCallData(
      data.coord.lat,
      data.coord.lon,
    );

    return {
      currentWeather: {
        name: data.name,
        temparature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].main,
        icon: data.weather[0].icon,
      },
      forecasts: oneCallData.daily.slice(0, 5).map((forecast: any) => {
        return {
          timestamp: forecast.dt,
          icon: forecast.weather[0].icon,
          min: forecast.temp.min,
          max: forecast.temp.max,
          desciption: forecast.weather[0].main,
        };
      }),
    };
  }

  async getForecastAndCurrentWeatherUsingCoords(
    lat: number,
    lon: number,
  ): Promise<WeatherApiResult> {
    const data = await this.getOneCallData(lat, lon);
    return {
      currentWeather: {
        name: "Current Location",
        temparature: data.current.temp,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        description: data.current.weather[0].main,
        icon: data.current.weather[0].icon,
      },
      forecasts: data.daily.slice(0, 5).map((forecast: any) => {
        return {
          timestamp: forecast.dt,
          icon: forecast.weather[0].icon,
          min: forecast.temp.min,
          max: forecast.temp.max,
          desciption: forecast.weather[0].main,
        };
      }),
    };
  }

  private async getOneCallData(lat: number, lon: number): Promise<any> {
    const response = await fetch(
      `${this.base}/data/3.0/onecall?units=METRIC&exclude=minutely,hourly&lon=${lon}&lat=${lat}&appid=${this.apiKey}`,
    );
    return await response.json();
  }
}
