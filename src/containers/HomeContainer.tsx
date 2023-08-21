import React, { ChangeEvent, FC, useState } from "react";
import { Searchbar } from "framework7-react";
import { debounce } from "throttle-debounce";
import WeatherApi from "../api/WeatherApi";
import { Spinner } from "../components/Spinner/Spinner";
import { Banner } from "../components/Banner/Banner";
import { WeatherData } from "../components/WeatherData/WeatherData";

export const HomeContainer: FC = () => {
  const weatherApi = new WeatherApi(
    process.env.REACT_APP_OPEN_WEATHER_API_KEY as string,
  );

  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecasts, setForecasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    500,
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
