declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      H_UNI_APPDEVTOOL_ENV: 'production' | 'development';
      JAVA_HOME?: string;
      ANDROID_SDK_ROOT?: string;
    }
  }

}

export { };
