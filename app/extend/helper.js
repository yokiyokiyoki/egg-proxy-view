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
  getServerAddress: (server) => {
    const address = server.httpServer.address();

    if (typeof address === "string") {
      return address;
    }

    const ip = (address && address.address) || "0.0.0.0";

    const port = (address && address.port) || 3000;

    return `${ip === "::" ? "0.0.0.0" : ip}:${port}`;
  },
};
