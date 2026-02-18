## Created with Capacitor Create App

This app was created using [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app),
and comes with a very minimal shell for building an app.

### Running this example

To run the provided example, you can use `npm start` command.

```bash
npm start
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

### Adding Capawesome Biometrics Plugin
```bash
npm config set @capawesome-team:registry https://npm.registry.capawesome.io
npm config set //npm.registry.capawesome.io/:_authToken <YOUR_LICENSE_KEY>

# Replace <YOUR_LICENSE_KEY> with the license key you received when joining the Insiders program https://capawesome.io/insiders/

npm install @capawesome-team/capacitor-biometrics
npx cap sync
```