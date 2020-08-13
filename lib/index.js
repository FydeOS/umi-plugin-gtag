"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  api.logger.info('use plugin');
  api.describe({
    key: 'gtag',
    config: {
      schema(joi) {
        return joi.object({
          GA_MEASUREMENT_ID: joi.string(),
          SEND_DATA_NAME: joi.string()
        });
      }

    }
  });

  const gtagTpl = function gtagTpl(id, key) {
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
        console.log(data)
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    })();
  `;
  };

  if (api.userConfig.gtag) {
    const _api$userConfig$gtag = api.userConfig.gtag,
          GA_MEASUREMENT_ID = _api$userConfig$gtag.GA_MEASUREMENT_ID,
          SEND_DATA_NAME = _api$userConfig$gtag.SEND_DATA_NAME;

    if (api.env !== 'development') {
      if (GA_MEASUREMENT_ID) {
        api.addHTMLScripts(() => [{
          content: gtagTpl(GA_MEASUREMENT_ID, SEND_DATA_NAME)
        }]);
      }
    } else {
      console.log('gtag will add in production');
    }
  }
}