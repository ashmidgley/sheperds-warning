import React, { FC } from "react";
import "./Banner.css";
import { Block } from "framework7-react";
import clsx from "clsx";

interface BannerProps {
  type?: "info" | "error";
  message: string;
}

export const Banner: FC<BannerProps> = ({ type = "info", message }) => {
  return <Block className={clsx("banner", type)}>{message}</Block>;
};
