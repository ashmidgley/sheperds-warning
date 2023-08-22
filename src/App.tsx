import React from "react";
import routes from "./routes";
import { Framework7Parameters } from "framework7/types";
import { App as Framework7App, View } from "framework7-react";
import { AppContextProvider } from "./contexts/AppContext";

const f7params = {
  name: "Sheperd's Warning",
  routes,
  darkMode: false,
} as Framework7Parameters;

function App() {
  return (
    <Framework7App {...f7params}>
      <AppContextProvider>
        <View main url="/" />
      </AppContextProvider>
    </Framework7App>
  );
}

export default App;
