const { createServer } = require("vite");

const { createProxyMiddleware } = require("http-proxy-middleware");
const k2Connect = require("koa2-connect");
const { pathToRegexp } = require("path-to-regexp");

module.exports = () => {
  return async function (ctx, next) {
    const { app, path, protocol } = ctx;
    const { targets = [], inlineConfig = {} } = app.config.vite;

    // 启动vite服务
    if (!app.viteServer) {
      app.viteServer = await (await createServer(inlineConfig)).listen();
      app.viteServer.printUrls();
    }

    // 自定义规则转发到vite服务

    for (const target of targets) {
      // 判断是否是正则
      if (
        (ctx.helper.isRegexp(target) ? target : pathToRegexp(target)).test(path)
      ) {
        await k2Connect(
          createProxyMiddleware({
            target: `${protocol}://${ctx.helper.getServerAddress(
              app.viteServer
            )}`,
            changeOrigin: true,
          })
        )(ctx, next);

        break;
      }
    }

    await next();
  };
};
