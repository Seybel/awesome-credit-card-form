module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    moduleFileExtensions: [ 'js', 'json', 'vue' ],
    moduleDirectories: [ 'node_modules', '<rootDir>' ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // resolves the `@/components` path
    },
    transform: {
      '^.+\\.js$': 'babel-jest', // test .js files with babel-jest
      '^.+\\.vue$': '@vue/vue2-jest', // test .vue files with vue2-jest
    },
  };
  