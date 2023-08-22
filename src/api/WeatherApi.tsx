import { Coords } from "../types/Coords";
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
    const coords = await this.getCoordsFromName(name);
    return await this.getForecastAndCurrentWeatherUsingCoords(
      coords.latitude,
      coords.longitude,
    );
  }

  async getForecastAndCurrentWeatherUsingCoords(
    lat: number,
    lon: number,
  ): Promise<WeatherApiResult> {
    const data = await this.getOneCallData(lat, lon);
    const name = await this.getNameFromCoords(lat, lon);

    return {
      currentWeather: {
        name: name,
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

  private async getCoordsFromName(name: string): Promise<Coords> {
    const response = await fetch(
      `${this.base}/geo/1.0/direct?q=${name}&limit=1&appid=${this.apiKey}`,
    );

    const data = await response.json();
    if (data.length === 0) {
      throw Error(`Could not find town, city or postcode ${name}.`);
    }

    return { latitude: data[0].lat, longitude: data[0].lon };
  }

  private async getOneCallData(lat: number, lon: number): Promise<any> {
    const response = await fetch(
      `${this.base}/data/3.0/onecall?units=METRIC&exclude=minutely,hourly&lon=${lon}&lat=${lat}&appid=${this.apiKey}`,
    );
    return await response.json();
  }

  private async getNameFromCoords(lat: number, lon: number): Promise<string> {
    const response = await fetch(
      `${this.base}/geo/1.0/reverse?lon=${lon}&lat=${lat}&limit=1&appid=${this.apiKey}`,
    );
    const data = await response.json();
    return data[0].name;
  }
}
