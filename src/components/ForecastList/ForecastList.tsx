import React, { FC } from "react";
import { Block, List, ListItem } from "framework7-react";
import "./ForecastList.css";
import { Forecast } from "../../types/Forecast";

interface ForecastsListProps {
  forecasts: Forecast[];
}

const openWeatherImgBaseUrl = "https://openweathermap.org/img/wn";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return days[date.getDay()];
};

export const ForecastList: FC<ForecastsListProps> = ({ forecasts }) => {
  return (
    <List>
      {forecasts.map((forecast) => (
        <ListItem key={forecast.timestamp}>
          <Block className="forecast">
            <Block className="day">
              <img
                src={`${openWeatherImgBaseUrl}/${forecast.icon}.png`}
                alt="open weather icon"
              />
              <span>{getDay(forecast.timestamp)}</span>
            </Block>
            <span>{`${forecast.max}°C / ${forecast.min}°C`}</span>
          </Block>
        </ListItem>
      ))}
    </List>
  );
};
