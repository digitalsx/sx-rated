// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'index.js', // Your entry file
  output: {
    file: 'dist/bundle.js', // Output file
    format: 'iife', // Immediately-invoked function expression format
    name: 'MyLibrary' // Global variable name for your library
  },
  plugins: [
    resolve(), // Resolves node_modules
    commonjs() // Converts CommonJS to ES6
  ]
};
