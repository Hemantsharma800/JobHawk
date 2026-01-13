const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Your backend URL
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': 'localhost' // Fix cookies for localhost
      },
      onProxyRes: function(proxyRes, req, res) {
        // Allow credentials
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      }
    })
  );
};
