interface EnvVars {
  apiUrl: string;
  clientId: string;
  secret: string;
}

const ENV: EnvVars = {
  apiUrl: 'http://localhost:3000',
  clientId: 'test-client',
  secret: 'test-secret',
};

export default function getEnvVars(): EnvVars {
  return ENV;
}
