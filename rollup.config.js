// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-import-css';
import strip from '@rollup/plugin-strip';

export default {
  input: 'index.js',
  output: [{
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyLibrary'
  },
  {
    file: 'dist/bundle.min.js',
    format: 'iife',
    name: 'version',
    plugins: [terser()]
  }],
  plugins: [
    resolve(),
    commonjs(),
    cleanup(),
    css(),
    strip()
  ]
};
