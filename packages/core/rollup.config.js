import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import postcssFlexboxfixer from 'postcss-flexboxfixer';
import autoprefixer from 'autoprefixer';

import pkg from './package.json';

const externals = Object.keys(pkg.peerDependencies);

export default {
  input: './src/index.ts',
  output: {
    sourcemap: true,
    format: 'es',
    dir: 'dist',
    plugins: [terser()],
  },
  external: [...externals],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: /node_modules/,
    }),
    /**
     * @see https://github.com/postcss/postcss/blob/master/docs/plugins.md
     */
    postcss({
      extract: true,
      plugins: [autoprefixer, postcssFlexboxfixer],
      modules: true,
    }),
  ],
};
