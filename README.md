# umi-plugin-gtag

[![NPM version](https://img.shields.io/npm/v/umi-plugin-gtag.svg?style=flat)](https://npmjs.org/package/umi-plugin-gtag) [![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-gtag.svg?style=flat)](https://npmjs.org/package/umi-plugin-gtag)

using gtag.js to send data from your site to Google Analytics.

## Install

Using npm:

```bash
$ npm install -D umi-plugin-gtag
```

or using yarn:

```bash
$ yarn add --dev umi-plugin-gtag
```

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [['umi-plugin-gtag']],
  gtag: {
    GA_MEASUREMENT_ID: 'UA-xxxxxx-x',
    SEND_DATA_NAME: 'gtagData',
  },
  // 服务端渲染开启 ssr
  // ssr: {},
};
```

如果想使用 set 设置发送每个事件的相关数据

#### 客户端渲染

```js
window['gtagData'] = {
  user_id: 123,
};
```

#### 服务端渲染

```js
Home.getInitialProps = (async ctx => {
  console.log(ctx);
  return Promise.resolve({
    gtagData: {
      user_id: 123
    },
    data: {
      title: 'Hello World, Hello Umi!',
    },
  });
}) as IGetInitialProps;
```

## Options

#### GA_MEASUREMENT_ID

- Type: `string`

#### SEND_DATA_NAME

- Type: `string`

## LICENSE

MIT
