import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/KanMyBan.vue',
  output: [
    {
      format: 'esm',
      file: 'dist/kan-my-ban.esm.js',
    },
    {
      format: 'cjs',
      file: 'dist/kan-my-ban.cjs.js',
      exports: 'auto',
    },
    {
      name: 'KanMyBan',
      format: 'umd',
      file: 'dist/kan-my-ban.umd.js',
      globals: {
        vue: 'Vue',
      },
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    vue({ compileTemplate: true }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
    terser(),
  ],
  external: ['vue'],
};
