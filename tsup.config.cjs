import { defineConfig } from 'tsup';

import {
  legacyConfig,
  modernConfig
} from './scripts/tsup.cjs';
import pkg from './package.json';

const external = Object.keys(pkg.peerDependencies || {});

export default defineConfig([
  modernConfig({
    entry: ['src/**/*.{ts,tsx}', '!**/*.{test,spec,stories}.{ts,tsx}'],
    external,
  }),
  legacyConfig({
    entry: ['src/**/*.{ts,tsx}', '!**/*.{test,spec,stories}.{ts,tsx}'],
    external,
  }),
]);
