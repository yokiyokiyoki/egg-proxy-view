'use strict';

/**
 * egg-proxy-view default config
 * @member Config#proxy-view
 * @property {String} SOME_KEY - some description
 */
exports.proxyView = {
    /**
     * 是否运行devServer
     */
    open: false,
    /**
     * devServer配置
     */
    devServer:{
        host:"localhost",
        port:8899,
    },
    /**
     * 转发到devServer服务,如webpack，vite启动的代理服务
     * 规则参见http-proxy-middleware
     * [/^(\/node_modules)/g，'/assets/(.*)']
     */
    targets: [],
};
