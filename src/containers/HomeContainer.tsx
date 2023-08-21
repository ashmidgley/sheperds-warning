import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Searchbar } from "framework7-react";
import { debounce } from "throttle-debounce";
import WeatherApi from "../api/WeatherApi";
import { Spinner } from "../components/Spinner/Spinner";
import { Banner } from "../components/Banner/Banner";
import { WeatherData } from "../components/WeatherData/WeatherData";
import { Geolocation } from "@capacitor/geolocation";
import { Weather } from "../types/Weather";
import { Forecast } from "../types/Forecast";

export const HomeContainer: FC = () => {
  const weatherApi = new WeatherApi(
    process.env.REACT_APP_OPEN_WEATHER_API_KEY as string,
  );

  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    Geolocation.getCurrentPosition()
      .then((position) => {
        weatherApi
          .getForecastAndCurrentWeatherUsingCoords(
            position.coords.latitude,
            position.coords.longitude,
          )
          .then((data) => {
            setCurrentWeather(data.currentWeather);
            setForecasts(data.forecasts);
          })
          .catch((error) => setError(error.message))
          .finally(() => setIsLoading(false));
      })
      .catch((error) => {
        /* GetPosition will throw if system location services are disabled.
         * In this case we ignore the error and let the user search for location instead.
         */
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    if (!name) {
      handleClear();
      return;
    }

    setError("");
    setIsLoading(true);
    weatherApi
      .getForecastAndCurrentWeather(name)
      .then((data) => {
        setCurrentWeather(data.currentWeather);
        setForecasts(data.forecasts);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const handleChangeDebounced = debounce(
    1500,
    (event: ChangeEvent<HTMLInputElement>) => {
      handleChange(event);
    },
  );

  const getContent = (): JSX.Element => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <Banner message={error} type="error" />;
    }

    return (
      <WeatherData currentWeather={currentWeather} forecasts={forecasts} />
    );
  };

  const handleClear = () => {
    setError("");
    setCurrentWeather(null);
    setForecasts([]);
  };

  return (
    <>
      <Searchbar
        onChange={handleChangeDebounced}
        onClickClear={handleClear}
        onClickDisable={handleClear}
      />
      {getContent()}
    </>
  );
};
