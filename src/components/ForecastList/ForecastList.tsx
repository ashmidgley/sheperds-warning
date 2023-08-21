import React, { FC } from "react";
import { Block, List, ListItem } from "framework7-react";
import "./ForecastList.css";

interface ForecastsListProps {
  forecasts: any[];
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
        <ListItem key={forecast.dt}>
          <Block className="forecast">
            <Block className="day">
              <img
                src={`${openWeatherImgBaseUrl}/${forecast.weather[0].icon}.png`}
              />
              <span>{getDay(forecast.dt)}</span>
            </Block>
            <span>{`${forecast.temp.max}°C / ${forecast.temp.min}°C`}</span>
          </Block>
        </ListItem>
      ))}
    </List>
  );
};
