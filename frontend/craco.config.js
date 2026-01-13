module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const sourceMapLoaderRule = webpackConfig.module.rules.find(
        (rule) => rule.enforce === 'pre' && rule.use && rule.use.loader && rule.use.loader.includes('source-map-loader')
      );
      
      if (sourceMapLoaderRule) {
        if (!sourceMapLoaderRule.exclude) {
          sourceMapLoaderRule.exclude = [];
        }
        sourceMapLoaderRule.exclude.push(/node_modules\/react-router-dom/);
      }
      
      return webpackConfig;
    }
  }
};
