const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({analyzerMode: "json" })
    ],
    experiments: {
        topLevelAwait: true
    }
};
