"use strict";

const cheerio = require("cheerio");
const path = require("path");

module.exports = {
  get proxyView() {
    return {
      /**
       * 渲染视图
       * 如果本地存在devServer服务，则替换模板页面中资源的引用路径
       * 线上不存在，则直接输出
       * await ctx.proxyView.render('index.html', htmlData);
       * @param {*} name 如"index.html"
       * @param {*} data
       * @returns
       */
      render: async (name, data) => {
        if (this.app.connectProxyServer) {
          const { host, port } = this.app.connectProxyServer;
          const address = `${host}:${port}`;
          const html = (
            await this.curl(`${this.protocol}://${path.join(address, name)}`, {
              // vite服务需要传accept头部才会返回html，否则会404
              headers: {
                Accept:
                  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              },
            })
          ).data.toString();
          // 获取devServer html
          const $ = cheerio.load(html, {});

          // 替换资源路径
          $("script").each((_idx, elm) => {
            const child = $(elm);
            const src = child.attr("src");
            if (
              src &&
              !src.startsWith("http:") &&
              !src.startsWith("https:") &&
              !src.startsWith("//")
            ) {
              child.attr("src", `//${path.join(address, src)}`);
            }
          });
          // 拿devServer的html 传入服务端的data 重新渲染
          this.body = await this.renderString($.html({}), data);
        } else {
          // 不存在devServer服务，直接输出
          return await this.render(name, data);
        }
      },
    };
  },
};
