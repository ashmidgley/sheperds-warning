<img width="263" alt="Screenshot 2023-08-23 at 7 28 44 AM" src="https://github.com/ashmidgley/sheperds-warning/assets/13953984/7b806f12-5a16-4b1c-a4fe-7a5614d7bb0a">
<img width="268" alt="Screenshot 2023-08-23 at 7 31 38 AM" src="https://github.com/ashmidgley/sheperds-warning/assets/13953984/082195e4-bc1f-4595-9a9e-d56bd069c575">

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

### Setup

- For iOS, make sure you have [CocoaPods](https://cocoapods.org) installed.
- For Android, make sure you have the [Android SDK](https://developer.android.com/studio) installed.

### Build

Build the web code:

```
npm run build
```

Add the platforms:

```
npx cap add ios && npx cap add android
```

Sync the web code to the Capacitor projects:

```
npx cap sync
```

### Allow Location Services

For iOS, add the below to the <dict> tag in `ios/App/App/Info.plist`:

```
<key>NSLocationAlwaysUsageDescription</key>
<string>We need access to your location to provide location-based services.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need access to your location to provide location-based services.</string>
```

For Android, add the below to `android/app/src/main/AndroidManifest.xml`:

```
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

For more details on configurating location services, see [here](https://capacitorjs.com/docs/apis/geolocation).

### Run

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
- Data Storage

## Unimplemented Features

- Offline First
