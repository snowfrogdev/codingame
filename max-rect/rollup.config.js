import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
    // browser-friendly UMD build
    {
        input: 'src/main.ts',
        output: {
            name: 'max-rect',
            file: pkg.browser,
            format: 'umd'
        },
        plugins: [
            resolve(),   // so Rollup can find external commonjs modules
            commonjs(),  // so Rollup can convert external commonjs modules to an ES module
            typescript() // so Rollup can convert TypeScript to JavaScript
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify 
    // `file` and `format` for each target)
    {
        input: 'src/main.ts',
        external: [], // this is where you would include external commonjs modules
        plugins: [
            typescript() // so Rollup can convert TypeScript to JavaScript
        ],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ]
    }
];