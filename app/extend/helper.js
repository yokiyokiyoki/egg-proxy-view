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
   * 获取host和端口
   */
  getHostPort(){
    const eggConfig=this.app.config.proxyView.server
    const config={
      host:eggConfig.host||"localhost",
      port:eggConfig.port
    }
    if(!config.port){
      throw new Error('请输入端口')
    }
    // @todo：判断host和port是否合法
    return config
  },
  /**
   * 拼凑server的ip和端口
   * @param {*} server
   * @returns
   */
  getServerAddress: () => {
    const {host,port}=this.ctx.helper.getHostPort()
    
    return `${!host ? "localhost" : host}:${port}`;
  },
  
  /**
   * 检查服务连接
   * @param {*} timeout 
   * @returns 
   */
  checkConnection(timeout) {
    let {host,port}=this.ctx.helper.getHostPort()
    
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
