import { Forecast } from "./Forecast";
import { Weather } from "./Weather";

export interface WeatherApiResult {
  currentWeather: Weather;
  forecasts: Forecast[];
}
