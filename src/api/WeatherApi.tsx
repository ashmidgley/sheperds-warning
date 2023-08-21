interface IWeatherApi {
  getForecastAndCurrentWeather(name: string): Promise<any>;
}

export default class WeatherApi implements IWeatherApi {
  private readonly apiKey: string;
  private readonly base = "https://api.openweathermap.org";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getForecastAndCurrentWeather(name: string): Promise<any> {
    const currentWeatherResponse = await fetch(
      `${this.base}/data/2.5/weather?units=METRIC&q=${name}&appid=${this.apiKey}`,
    );

    if (currentWeatherResponse.status === 404) {
      throw Error(`Could not find town, city or postcode ${name}.`);
    } else if (!currentWeatherResponse.ok) {
      throw Error(
        `Error fetching current weather. Response code ${currentWeatherResponse.status}`,
      );
    }
    const currentWeather = await currentWeatherResponse.json();

    const { lat, lon } = currentWeather.coord;
    const forecastResponse = await fetch(
      `${this.base}/data/3.0/onecall?units=METRIC&exclude=minutely,hourly&lon=${lon}&lat=${lat}&appid=${this.apiKey}`,
    );
    const forecasts = await forecastResponse.json();

    return {
      currentWeather,
      forecasts: forecasts.daily.slice(0, 5),
    };
  }
}
