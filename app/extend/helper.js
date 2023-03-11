const net = require('net');
module.exports = {
  /**
   * 是否正则
   * @param {*} target
   * @returns
   */
  isRegexp: (target) => {
    return Object.prototype.toString.call(target) === "[object RegExp]";
  },
  /**
   * 获取server的ip和端口
   * @param {*} server
   * @returns
   */
  getServerAddress: () => {
    const {host,port}=this.app.config.proxyView.server
    // @todo：判断host和port是否合法
    return `${host === "::" ? "0.0.0.0" : host}:${port}`;
  },
  
  /**
   * 检查服务连接
   * @param {*} timeout 
   * @returns 
   */
  checkConnection(timeout) {
    const {host,port}=this.app.config.proxyView.server
    return new Promise(function(resolve, reject) {
        timeout = timeout || 10000;     // default of 10 seconds
        var timer = setTimeout(function() {
            reject("timeout");
            socket.end();
        }, timeout);
        var socket = net.createConnection(port, host, function() {
            clearTimeout(timer);
            resolve();
            socket.end();
        });
        socket.on('error', function(err) {
            clearTimeout(timer);
            reject(err);
        });
    });
}

};
