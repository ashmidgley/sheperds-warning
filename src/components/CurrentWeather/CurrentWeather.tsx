import React, { FC } from "react";
import { Block } from "framework7-react";
import "./CurrentWeather.css";

interface CurrentWeatherProps {
  name: string;
  temparature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({
  name,
  temparature,
  humidity,
  windSpeed,
  description,
  icon,
}) => {
  return (
    <Block className="current-weather">
      <Block className="col" textColor="white">
        <span className="name">{name}</span>
        <span className="temp">{`${Math.round(temparature)}°`}</span>
        <span className="description">{description}</span>
        <span className="description">{`Humidity: ${humidity}%`}</span>
        <span className="description">{`Wind: ${windSpeed}m/s`}</span>
      </Block>
    </Block>
  );
};
