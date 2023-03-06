module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: [
    '<rootDir>/test/**/*.(test|spec).ts?(x)',
    '<rootDir>/src/**/*.(test|spec).ts?(x)'
  ],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
};
