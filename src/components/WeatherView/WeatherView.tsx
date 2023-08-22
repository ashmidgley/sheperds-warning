import { Fab } from "framework7-react";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { Forecast } from "../../types/Forecast";
import { Weather } from "../../types/Weather";
import { Spinner } from "../Spinner/Spinner";
import { WeatherData } from "../WeatherData/WeatherData";

interface WeatherViewProps {
  isLoading: boolean;
  onClick: () => void;
  currentWeather: Weather | null;
  forecasts: Forecast[];
}

export const WeatherView: FC<WeatherViewProps> = ({
  isLoading,
  onClick,
  currentWeather,
  forecasts,
}) => {
  return (
    <>
      <Fab
        onClick={onClick}
        tooltip="Search for alternative town, city or postcode"
        slot="fixed"
      >
        <FaSearch className="search-icon" />
      </Fab>
      {isLoading ? (
        <Spinner />
      ) : (
        <WeatherData currentWeather={currentWeather} forecasts={forecasts} />
      )}
    </>
  );
};
