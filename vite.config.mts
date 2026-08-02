import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],

  test: {
    // Use jsdom to simulate browser environment for React components
    environment: 'jsdom',

    // Auto-import testing utilities globally (no need to import in every test)
    globals: true,

    // Run this setup file before each test suite
    setupFiles: ['./src/__tests__/setup.ts'],

    // Include test file patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.stories.{ts,tsx}',
        'src/app/layout.tsx',
        'src/app/page.tsx',
      ],
    },
  },

  resolve: {
    alias: {
      // Match Next.js @ path alias
      '@': resolve(__dirname, './src'),
    },
  },
});
