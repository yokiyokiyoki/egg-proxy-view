# egg-proxy-view

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/egg-proxy-view.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-proxy-view

一般用于代理前端 devServer 的 html

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

```ts
@Get('/*')
async home() {
  const ctx = this.ctx;
  const userAgent = ctx.headers['user-agent'];
  const mobileReg = /\s+Mobile/i;
  const template = mobileReg.test(userAgent) ? 'mobile.html' : 'index.html';
  // 如果open为false，会自动走ctx.render
  await ctx.proxyView.render(template, { data: {} });
}
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
