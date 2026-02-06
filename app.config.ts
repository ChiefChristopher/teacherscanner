//import { Env } from '@env';
import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';
const { Env } = require('./env');

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: (Env.APP_ENV ?? 'development') !== 'production',
  badges: [
    {
      text: Env.APP_ENV ?? 'development',
      type: 'banner',
      color: 'white',
    },
    {
      text: (Env.VERSION ?? '1.0.0').toString(),
      type: 'ribbon',
      color: 'white',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME ?? 'Speasy',
  description: `${Env.NAME ?? 'Speasy'} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER ?? undefined,
  scheme: Env.SCHEME ?? 'obytesApp',
  slug: 'teacherscanner',
  version: Env.VERSION ?? '1.0.0',
  orientation: 'portrait',
  icon: './assets/teacherscan.jpg',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID ?? 'com.obytes',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/teacherscan.jpg',
      backgroundColor: '#2E3C4B',
    },
    package: Env.PACKAGE as string,
  },
  web: {
    favicon: './assets/teacherscan.jpg',
    bundler: 'metro',
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#2E3C4B',
        image: './assets/teacherscan.jpg',
        imageWidth: 150,
      },
    ],
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf'],
      },
    ],
    'expo-localization',
    'expo-router',
    ['app-icon-badge', appIconBadgeConfig],
    ['react-native-edge-to-edge'],
  ],
  extra: {
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
