# egg-proxy-view

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/egg-proxy-view.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-proxy-view

<!--
Description here.
-->

## Install

```bash
$ npm i egg-proxy-view --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.proxyView = {
  enable: true,
  package: 'egg-proxy-view',
};
```

## Configuration

```js
// {app_root}/config/config.local.js
config.proxyView = {
    // default默认是false，就不会启动该插件的中间件
    open: false,
    /**
     * devServer配置
     */
    devServer:{
        host:"localhost",
        port:8899,
    },
    targets: [
      /^(\/node_modules)/g，
      '/assets/(.*)'
    ],
  }
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
