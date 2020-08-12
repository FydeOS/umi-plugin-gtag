// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';

export default function(api: IApi) {
  api.logger.info('use plugin');

  api.describe({
    key: 'gtag',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });
  const gtagTpl = function(id: string, userIdVariable: string) {
    return `
    (function(){
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
        window.gtag('set', {'user_id': window["${userIdVariable}"]})
        console.log(window["${userIdVariable}"])
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    })();
  `;
  };
  if (api.userConfig.gtag) {
    const { GA_MEASUREMENT_ID, userIdVariable } = api.userConfig.gtag;
    if (api.env !== 'development' || true) {
      if (GA_MEASUREMENT_ID) {
        api.addHTMLScripts(() => [
          {
            content: gtagTpl(GA_MEASUREMENT_ID, userIdVariable),
          },
        ]);
      }
    } else {
      console.log('gtag will add in production');
    }
  }
}
