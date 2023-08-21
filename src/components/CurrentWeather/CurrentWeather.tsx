import React, { FC } from "react";
import { Block } from "framework7-react";
import "./CurrentWeather.css";

const openWeatherImgBaseUrl = "https://openweathermap.org/img/wn";

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
      <Block className="col">
        <span className="name">{name}</span>
        <Block className="temp-container">
          <img src={`${openWeatherImgBaseUrl}/${icon}.png`} />
          <span className="temp">{`${temparature}°C`}</span>
        </Block>
      </Block>
      <Block className="col">
        <span>{description}</span>
        <span>{`Humidity: ${humidity}%`}</span>
        <span>{`Wind: ${windSpeed}m/s`}</span>
      </Block>
    </Block>
  );
};
