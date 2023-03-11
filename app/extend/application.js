const SERVER = Symbol('application#proxy-server');

module.exports = {
  get isConnectProxyServer() {
    return this[SERVER];
  },
  set isConnectProxyServer(value) {
    this[SERVER] = value;
  },
};