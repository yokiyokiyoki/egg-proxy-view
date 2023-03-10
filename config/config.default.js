'use strict';

/**
 * egg-vite default config
 * @member Config#vite
 * @property {String} SOME_KEY - some description
 */
exports.vite = {
    /**
     * 是否运行devServer
     */
    devServer: false,
    /**
     * vite creatServer调用的，参考vite文档，可以自定义配置文件在哪里
     */
    inlineConfig:{

    },
    /**
     * 转发到vite服务
     * 规则参见http-proxy-middleware
     * [/^(\/node_modules)/g，'/assets/(.*)']
     */
    targets: [],
};
