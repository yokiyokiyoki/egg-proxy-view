
module.exports = (app) => {
  if (app.config.proxyView && app.config.proxyView.open) {
    app.config.coreMiddleware.push('proxyViewServer');
  }
};