// env.d.ts
declare module '@env' {
  // Runtime Env type (what you export from env.js)
  export interface Env {
    APP_ENV: 'development' | 'staging' | 'production';
    NAME: string;
    SCHEME: string;
    BUNDLE_ID: string;
    PACKAGE: string;
    VERSION: string;
    API_URL: string;
    VAR_NUMBER: number;
    VAR_BOOL: boolean;

    // Optional Google fields
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_IOS_CLIENT_ID?: string;
    GOOGLE_ANDROID_CLIENT_ID?: string;

    // Build-time fields
    EXPO_ACCOUNT_OWNER?: string;
    EAS_PROJECT_ID?: string;
    SECRET_KEY?: string;
    MONGODB_URI?: string;
  }

  // Declare Env as both type and value (this is key!)
  export const Env: Env;

  // ClientEnv type (if used)
  export interface ClientEnv {
    APP_ENV: 'development' | 'staging' | 'production';
    NAME: string;
    SCHEME: string;
    BUNDLE_ID: string;
    PACKAGE: string;
    VERSION: string;
    API_URL: string;
    VAR_NUMBER: number;
    VAR_BOOL: boolean;
  }

  export const ClientEnv: ClientEnv;
}
