import baseConfig, { restrictEnvAccess } from "@ai-song-generator/eslint-config/base";
import nextjsConfig from "@ai-song-generator/eslint-config/nextjs";
import reactConfig from "@ai-song-generator/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
