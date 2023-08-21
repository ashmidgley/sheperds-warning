import React, { FC } from "react";
import { CurrentWeather } from "../CurrentWeather/CurrentWeather";
import { ForecastList } from "../ForecastList/ForecastList";

interface WeatherDataProps {
  currentWeather: any;
  forecasts: any[];
}

export const WeatherData: FC<WeatherDataProps> = ({
  currentWeather,
  forecasts,
}) => {
  if (currentWeather === null || forecasts.length === 0) {
    return <></>;
  }

  return (
    <>
      <CurrentWeather
        name={currentWeather.name}
        temparature={currentWeather.main.temp}
        humidity={currentWeather.main.humidity}
        windSpeed={currentWeather.wind.speed}
        description={currentWeather.weather[0].main}
        icon={currentWeather.weather[0].icon}
      />
      <ForecastList forecasts={forecasts} />
    </>
  );
};
