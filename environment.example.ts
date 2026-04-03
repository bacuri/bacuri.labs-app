import * as Updates from 'expo-updates';

const ENV = {
  dev: {
    apiUrl: '',
    clientId: '',
    secret: '',
  },
  staging: {
    apiUrl: '',
    clientId: '',
    secret: '',
  },
  prod: {
    apiUrl: '',
    clientId: '',
    secret: '',
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }

  const channel = Updates.channel || 'default';

  if (channel === 'staging') return ENV.staging;
  if (channel === 'prod') return ENV.prod;

  return ENV.default;
};

export default getEnvVars;
