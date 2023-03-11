

const { createProxyMiddleware } = require("http-proxy-middleware");
const k2Connect = require("koa2-connect");
const { pathToRegexp } = require("path-to-regexp");

module.exports = () => {
  return async function (ctx, next) {
    const { app, path, protocol } = ctx;
    const { targets = []} = app.config.proxyView;

    // 如果没有检测到服务连接
    if (!app.connectProxyServer) {
      try{
        await ctx.helper.checkConnection()
        app.connectProxyServer=ctx.helper.getServerAddress()
        ctx.logger.info(`[egg-proxy-view]:插件已经连接到devServer`)
      }catch(err){
        ctx.logger.error(`egg-proxy-view 无法连接到devServer，请检查对应端口${ctx.helper.getServerAddress()}是否启动`)
      }
    }

    // 自定义规则转发到devServer服务

    for (const target of targets) {
      // 判断是否是正则
      if (
        (ctx.helper.isRegexp(target) ? target : pathToRegexp(target)).test(path)
      ) {
        await k2Connect(
          createProxyMiddleware({
            target: `${protocol}://${ctx.helper.getServerAddress()}`,
            changeOrigin: true,
          })
        )(ctx, next);

        break;
      }
    }

    await next();
  };
};
