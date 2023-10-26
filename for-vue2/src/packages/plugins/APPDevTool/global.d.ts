declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      H_UNI_APPDEVTOOL_ENV: 'production' | 'development';

    }
  }

}

export { };
