const SERVER = Symbol('application#proxy-server');

module.exports = {
  get connectProxyServer() {
    return this[SERVER];
  },
  set connectProxyServer(value) {
    this[SERVER] = value;
  },
};