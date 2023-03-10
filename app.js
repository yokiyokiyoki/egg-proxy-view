
module.exports = (app) => {
  if (app.config.vite && app.config.vite.devServer) {
    app.config.coreMiddleware.push('vite');
  }
};