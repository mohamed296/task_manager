import { defineConfig } from 'tsup';
import tsconfig from './tsconfig.json';

export default defineConfig((options) => ({
  name: 'Axiom',
  entry: ['src/index.ts', 'scripts/audio2file.ts'],
  format: ['esm', 'cjs'],
  target: tsconfig.compilerOptions.target as 'esnext',
  outDir: 'dist',
  // dts: true,
  sourcemap: true,
  clean: true,
  minify: !options.watch,
  splitting: false,
}));
