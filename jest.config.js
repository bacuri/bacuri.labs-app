module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$':
      '@react-native-async-storage/async-storage/jest/async-storage-mock',
    '\\.svg$': '<rootDir>/jest/svgMock.ts',
    environment$: '<rootDir>/jest/environmentMock.ts',
  },
  setupFiles: [
    '<rootDir>/jest/setup.ts',
    'react-native-gesture-handler/jestSetup',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/mocks/**',
    '!src/i18n/index.ts',
  ],
};
