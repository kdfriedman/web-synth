const path = require("path");

module.exports = {
  mode: 'development',
  entry: "./src/app.component.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "public/"),
    filename: "bundle.js"
  },
  devServer:{
    contentBase: 'public'
},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
      ],
    }
};