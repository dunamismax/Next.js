import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.api.ts'],
  testMatch: ['**/__tests__/api/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\.(t|j)sx?$': '@swc/jest',
  },
};

export default createJestConfig(config);
