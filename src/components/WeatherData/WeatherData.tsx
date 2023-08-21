import React, { FC } from "react";
import { Forecast } from "../../types/Forecast";
import { Weather } from "../../types/Weather";
import { CurrentWeather } from "../CurrentWeather/CurrentWeather";
import { ForecastList } from "../ForecastList/ForecastList";

interface WeatherDataProps {
  currentWeather: Weather | null;
  forecasts: Forecast[];
}

export const WeatherData: FC<WeatherDataProps> = ({
  currentWeather,
  forecasts,
}) => {
  if (!currentWeather || forecasts.length === 0) {
    return <></>;
  }

  return (
    <>
      <CurrentWeather
        name={currentWeather?.name}
        temparature={currentWeather?.temparature}
        humidity={currentWeather?.humidity}
        windSpeed={currentWeather?.windSpeed}
        description={currentWeather?.description}
        icon={currentWeather?.icon}
      />
      <ForecastList forecasts={forecasts} />
    </>
  );
};
