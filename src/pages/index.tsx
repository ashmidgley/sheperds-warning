import React from "react";
import "./index.css";
import { Page, PageContent } from "framework7-react";
import { HomeContainer } from "../containers/HomeContainer";
import clsx from "clsx";
import { getDevice } from "framework7/lite/bundle";

export const Home = () => {
  const device = getDevice();

  return (
    <Page
      name="home"
      bgColor="lightblue"
      className={clsx(device.ios && "ios-overlay")}
    >
      <PageContent>
        <HomeContainer />
      </PageContent>
    </Page>
  );
};
