// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const CopyPlugin = require('copy-webpack-plugin');


const config = {
  entry: {
    serviceWorker: path.resolve(__dirname, "src", "serviceWorker.ts"),
    contentScript: path.resolve(__dirname, "src", "contentScript.ts"),
    popup: path.resolve(__dirname, "src", "popup.ts"),
    options: path.resolve(__dirname, "src", "options.ts"),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/

    new ESLintPlugin({
      extensions: ['js', 'ts'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new CopyPlugin({
      patterns: [{ from: ".", to: ".", context: "static" }]
    })

  ],
  module: {
    rules: [

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(scss|css)$/i,
        use: [stylesHandler, "css-loader", 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.devtool = "source-map";
  } else {
    config.mode = "development";
    config.devtool = "inline-source-map";
  }
  return config;
};
