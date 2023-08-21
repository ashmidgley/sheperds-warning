import React from "react";
import { Page, PageContent } from "framework7-react";
import { HomeContainer } from "../containers/HomeContainer";

export const Home = () => {
  return (
    <Page name="home">
      <PageContent>
        <HomeContainer />
      </PageContent>
    </Page>
  );
};