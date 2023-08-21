import React from "react";
import routes from "./routes";
import { Framework7Parameters } from "framework7/types";
import { App as Framework7App, View } from "framework7-react";

const f7params = {
  name: "Sheperd's Warning",
  routes,
  darkMode: false,
} as Framework7Parameters;

function App() {
  return (
    <Framework7App {...f7params}>
      <View main url="/" />
    </Framework7App>
  );
}

export default App;
