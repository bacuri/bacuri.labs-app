import * as Updates from 'expo-updates';

interface EnvVars {
  apiUrl: string;
  clientId: string;
  secret: string;
}

const ENV: Record<'dev' | 'staging' | 'prod', EnvVars> = {
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

const getEnvVars = (): EnvVars => {
  if (__DEV__) {
    return ENV.dev;
  }

  const channel = Updates.channel || 'default';

  if (channel === 'staging') return ENV.staging;
  if (channel === 'prod') return ENV.prod;

  return ENV.dev;
};

export default getEnvVars;
