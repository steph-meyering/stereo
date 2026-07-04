module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/frontend"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/frontend/setupTests.js"],
};
