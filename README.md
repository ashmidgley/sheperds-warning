## Setup

- Clone the repo and install dependencies:

```
git clone https://github.com/ashmidgley/sheperds-warning.git
npm install
```

- Create an account on [OpenWeatherMap](https://openweathermap.org).
- Set up a subscription for the [One Call API 3.0](https://openweathermap.org/api/one-call-3).
- Create an API Key.
- Add the key to REACT_APP_OPEN_WEATHER_API_KEY in .env.

## Web

This project was initialised using [Create React App](https://create-react-app.dev). All default script's apply:

```
npm run build // build
npm start // run
```

## Mobile

This project uses [Ionic Capacitor](https://capacitorjs.com) to build and run the application on mobile devices.

For iOS and Android, add the platforms:

```
npx cap add ios && npx cap add android
```

Then run using the below commands:

```
npx cap run ios
npx cap run android
```

## Tech Stack

- [React](https://react.dev)
- [Ionic Capacitor](https://capacitorjs.com)
- [Framework7](https://framework7.io)

## Implemented Features

- City Input
- Current Weather
- Weather Forecast
- Geolocation

## Unimplemented Features

- Data Storage
- Offline First
