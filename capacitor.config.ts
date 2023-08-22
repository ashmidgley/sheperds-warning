import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.ashmidgley.SheperdsWarning",
  appName: "Sheperd's Warning",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
};

export default config;
