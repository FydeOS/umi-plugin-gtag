import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  gtag: {
    GA_MEASUREMENT_ID: 'UA-xxxxxx-8',
    SEND_DATA_NAME: 'gtagData',
  },
  ssr: {},
});
