import React, { FC, createContext } from "react";
import WeatherApi, { IWeatherApi } from "../api/WeatherApi";
import { ISearchStore, SearchStore } from "../storage/SearchStore";
import { Geolocation } from "@capacitor/geolocation";
import { Coords } from "../types/Coords";

const searchStore = new SearchStore();

export const AppContext = createContext({
  weatherApi: {} as IWeatherApi,
  searchStore: {} as ISearchStore,
  getGeolocation: async (): Promise<Coords> =>
    new Promise((resolve, _) => resolve({ latitude: 0, longitude: 0 })),
});

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider: FC<Props> = ({ children }) => {
  const weatherApi = new WeatherApi(
    process.env.REACT_APP_OPEN_WEATHER_API_KEY as string,
  );

  const getGeolocation = async (): Promise<Coords> => {
    const status = await Geolocation.checkPermissions();
    if (status.location !== "granted" && status.coarseLocation !== "granted") {
      await Geolocation.requestPermissions();
    }

    const position = await Geolocation.getCurrentPosition();
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  };

  return (
    <AppContext.Provider
      value={{
        weatherApi,
        searchStore,
        getGeolocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
