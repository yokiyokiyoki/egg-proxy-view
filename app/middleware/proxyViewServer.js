

const { createProxyMiddleware } = require("http-proxy-middleware");
const k2Connect = require("koa2-connect");
const { pathToRegexp } = require("path-to-regexp");

module.exports = () => {
  return async function (ctx, next) {
    const { app, path, protocol } = ctx;
    const { targets = []} = app.config.proxyView;
    const hostPortConfig=ctx.helper.getHostPort()
    const {host,port}=hostPortConfig
    
    // 如果没有检测到服务连接
    if (!app.connectProxyServer) {
      try{
        await ctx.helper.checkConnection(host,port)
        app.connectProxyServer=hostPortConfig
        ctx.logger.info(`[egg-proxy-view]:插件已经连接到devServer ${ctx.helper.getServerAddress(host,port)}`)
      }catch(err){
        const address=`${host}:${port}`
        ctx.logger.error(`[egg-proxy-view]:插件无法连接到devServer，请检查对应配置config.proxyView.server是否正确填入，以及检查${address}是否启动,错误：${err}`)
      }
    }else{
      // 自定义规则转发到devServer服务
      for (const target of targets) {
        // 判断是否是正则
        if (
          (ctx.helper.isRegexp(target) ? target : pathToRegexp(target)).test(path)
        ) {
          await k2Connect(
            createProxyMiddleware({
              target: `${protocol}://${ctx.helper.getServerAddress(host,port)}`,
              changeOrigin: true,
            })
          )(ctx, next);

          break;
        }
      }
    }

    

    await next();
  };
};
