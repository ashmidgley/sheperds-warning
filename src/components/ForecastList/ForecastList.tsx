import React, { FC } from "react";
import { Block, List, ListItem } from "framework7-react";
import "./ForecastList.css";
import { Forecast } from "../../types/Forecast";
import { FaList } from "react-icons/fa";

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
    <Block className="forecast-list" bgColor="blue">
      <List>
        <ListItem className="list-header" textColor="white">
          <FaList />
          <span>5-DAY FORECAST</span>
        </ListItem>
        {forecasts.map((forecast) => (
          <ListItem key={forecast.timestamp}>
            <Block className="forecast">
              <Block className="day" textColor="white">
                <img
                  src={`${openWeatherImgBaseUrl}/${forecast.icon}.png`}
                  alt="open weather icon"
                />
                <span>{getDay(forecast.timestamp)}</span>
              </Block>
              <span className="high-low">{`${Math.round(
                forecast.min,
              )}° / ${Math.round(forecast.max)}°`}</span>
            </Block>
          </ListItem>
        ))}
      </List>
    </Block>
  );
};
