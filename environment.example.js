import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: '',
  },
  staging: {
    apiUrl: '',
  },
  prod: {
    apiUrl: '',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
  if (env === 'staging') {
    return ENV.staging;
  }
  if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
