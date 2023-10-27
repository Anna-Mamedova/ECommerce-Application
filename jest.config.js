module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': 'esbuild-jest',
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  setupFiles: ["jest-canvas-mock"]
};