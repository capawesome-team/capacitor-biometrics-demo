# Add Biometrics Authentication to your Capacitor App
This repository contains a minimal demo app showcasing how to implement Biometric authentication in a Capacitor application using the Capawesome Biometrics plugin.

 - [Biometrics Plugin Documentation](https://capawesome.io/plugins/biometrics/)
 - [Video Tutorial](https://youtu.be/ixUvTX6n7x8)


The demo is intentionally framework-agnostic and built with:
- Capacitor
- Vanilla JavaScript
- A minimal UI focused on the authentication flow

## Demo
https://github.com/user-attachments/assets/97ac6a73-424e-4181-90f8-2661e6e3a7e6


## Running this example

Install the project dependencies 

```bash
npm install
```

To run the provided example, you can use `npm start` command.

```bash
npm start
```

### Adding Capawesome Biometrics Plugin
The Biometrics plugin is part of the Capawesome Insiders program. [Get access to premium Capacitor plugins](https://capawesome.io/insiders/).

```bash
npm config set @capawesome-team:registry https://npm.registry.capawesome.io
npm config set //npm.registry.capawesome.io/:_authToken <YOUR_LICENSE_KEY>

# Replace <YOUR_LICENSE_KEY> with the license key you received when joining the Insiders program https://capawesome.io/insiders/

npm install @capawesome-team/capacitor-biometrics
npx cap sync
```

### Capacitor Development Workflow

Once you are ready to test your web app on a mobile device, you'll need to build your web app for distribution. 

```bash
npm run build
```

Once your web code has been built for distribution, you will need to push your web code to the web native Capacitor application.

```bash
npx cap sync
```

Sync command will copy over your already built web bundle to both your Android and iOS projects as well as update the native dependencies that Capacitor uses.

For more info read [Capacitor docs](https://capacitorjs.com/docs/basics/workflow)

## About Capawesome

Capawesome builds professional, production-ready plugins and tools for Capacitor developers.
Our mission is to make modern mobile app development easier, faster, and more reliable — without workarounds or hacks.

Learn more at 👉 https://capawesome.io