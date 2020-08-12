import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  gtag: {
    GA_MEASUREMENT_ID: 'UA-xxxxxx-8',
    userIdVariable: 'userId',
  },
});
