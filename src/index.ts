// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';

export default function(api: IApi) {
  api.logger.info('use plugin');
  api.describe({
    key: 'gtag',
    config: {
      schema(joi) {
        return joi.object({
          GA_MEASUREMENT_ID: joi.string(),
          SEND_DATA_NAME: joi.string(),
        });
      },
    },
  });
  const gtagTpl = function(id: string, key: string) {
    return `
    (function(){
      var data =  window.g_initialProps["${key}"] || window["${key}"]
      var script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=${id}';
      script.async = true;
      script.onload = function() {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', '${id}');
        data && window.gtag('set', data)
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    })();
  `;
  };
  if (api.userConfig.gtag) {
    const { GA_MEASUREMENT_ID, SEND_DATA_NAME } = api.userConfig.gtag;
    if (api.env !== 'development') {
      if (GA_MEASUREMENT_ID) {
        api.addHTMLScripts(() => [
          {
            content: gtagTpl(GA_MEASUREMENT_ID, SEND_DATA_NAME),
          },
        ]);
      }
    } else {
      console.log('gtag will add in production');
    }
  }
}
