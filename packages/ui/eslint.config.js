import baseConfig from "@ai-song-generator/eslint-config/base";
import reactConfig from "@ai-song-generator/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
