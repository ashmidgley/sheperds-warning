import React from "react";
import "./Spinner.css";
import { Block, Preloader } from "framework7-react";

export const Spinner = () => {
  return (
    <Block className="center">
      <Preloader color="white" />
    </Block>
  );
};
