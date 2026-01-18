const { defaults } = require("ts-jest/presets");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: defaults ? defaults.transform : undefined,
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$":
      "/home/user/epam_js/hatrian/hatrian/jest.styleMock.js",
  },
};
