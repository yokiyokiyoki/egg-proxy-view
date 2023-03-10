"use strict";

const cheerio = require("cheerio");
const path = require("path");

module.exports = {
  get vite() {
    return {
        /**
         * 渲染视图
         * 如果本地存在vite服务，自动从启动的服务实例获取，替换模板页面中资源的引用路径
         * 线上不存在，则直接输出
         * await ctx.vite.render('index.html', htmlData);
         * @param {*} name 如"index.html"
         * @param {*} data 
         * @returns 
         */
      render: async (name, data) => {
        if (this.app.viteServer) {
            // 获取vite的ip和端口
          const address = this.helper.getServerAddress(this.app.viteServer);

          const html = (
            await this.curl(`${this.protocol}://${path.join(address, name)}`)
          ).data.toString();
          // 获取vite的html
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
          // 拿vite的html 传入服务端的data 重新渲染
          this.body = await this.renderString($.html({}), data);
        } else {
          // 不存在vite服务，直接输出
          return await this.render(name, data);
        }
      },
    };
  },
};
