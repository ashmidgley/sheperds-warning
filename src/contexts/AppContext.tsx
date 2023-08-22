import React, { FC, createContext } from "react";
import WeatherApi, { IWeatherApi } from "../api/WeatherApi";
import { ISearchStore, SearchStore } from "../storage/SearchStore";

const searchStore = new SearchStore();

export const AppContext = createContext({
  weatherApi: {} as IWeatherApi,
  searchStore: {} as ISearchStore,
});

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider: FC<Props> = ({ children }) => {
  const weatherApi = new WeatherApi(
    process.env.REACT_APP_OPEN_WEATHER_API_KEY as string,
  );

  return (
    <AppContext.Provider
      value={{
        weatherApi,
        searchStore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
