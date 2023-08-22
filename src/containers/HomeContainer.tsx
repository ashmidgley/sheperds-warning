import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import "./HomeContainer.css";
import { debounce } from "throttle-debounce";
import { Weather } from "../types/Weather";
import { Forecast } from "../types/Forecast";
import { AppContext } from "../contexts/AppContext";
import { SearchView } from "../components/SearchView/SearchView";
import { WeatherView } from "../components/WeatherView/WeatherView";

export const HomeContainer: FC = () => {
  const { weatherApi, searchStore, getGeolocation } = useContext(AppContext);

  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (currentWeather === null && forecasts.length === 0) {
      setIsLoading(true);
      getGeolocation()
        .then((coords) => {
          weatherApi
            .getForecastAndCurrentWeatherUsingCoords(
              coords.latitude,
              coords.longitude,
            )
            .then((data) => {
              setCurrentWeather(data.currentWeather);
              setForecasts(data.forecasts);
            })
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
        })
        .catch(() => {
          /* GetPosition will throw if system location services are disabled.
           * In this case we ignore the error and let the user search for location instead.
           */
          setIsLoading(false);
        });
    }
  }, [currentWeather, forecasts, getGeolocation, weatherApi]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    if (!name) {
      handleClear();
      return;
    }
    search(name);
  };

  const search = (name: string) => {
    setError("");
    setIsLoading(true);
    weatherApi
      .getForecastAndCurrentWeather(name)
      .then((data) => {
        setCurrentWeather(data.currentWeather);
        setForecasts(data.forecasts);
        setIsSearching(false);
        searchStore.addSearch(name);
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

  const handleClear = () => {
    setIsSearching(false);
    setError("");
    setCurrentWeather(null);
    setForecasts([]);
  };

  if (isSearching) {
    return (
      <SearchView
        error={error}
        isLoading={isLoading}
        onChange={handleChangeDebounced}
        onClear={handleClear}
        onClickSuggestion={search}
      />
    );
  }

  return (
    <WeatherView
      isLoading={isLoading}
      onClick={() => setIsSearching(true)}
      currentWeather={currentWeather}
      forecasts={forecasts}
    />
  );
};
