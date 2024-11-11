import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.casadrive.app',
  appName: 'CasaDrive',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true,
    hostname: 'app'
  },
  android: {
    buildOptions: {
      keystorePath: 'release.keystore',
      keystorePassword: 'casadrive2024',
      keyAlias: 'casadrive',
      keyPassword: 'casadrive2024',
      releaseType: 'APK'
    },
    flavor: 'production',
    minSdkVersion: 22,
    targetSdkVersion: 33,
    versionCode: 1,
    versionName: '1.0.0'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#FFFFFF',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      spinnerColor: '#2563EB',
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#FFFFFF',
      overlaysWebView: false,
      androidOverlaysWebView: false
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true,
    },
    Geolocation: {
      permissions: ['location'],
    },
    Haptics: {
      enabled: true,
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#2563EB',
      sound: 'beep.wav'
    }
  }
};

export default config;