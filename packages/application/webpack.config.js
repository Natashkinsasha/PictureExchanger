const path = require('path');
const webpack = require('webpack');
const config = require('node-config-env-value');

const port = config.get('server.port');
const NODE_ENV = config.get('NODE_ENV');

module.exports = {

    entry: path.join(__dirname, 'src/main.js'),

    output: {
        path: path.join(__dirname, '/public/build'),
        publicPath: "/build",
        filename: "bundle.js"
    },


    devtool: NODE_ENV === 'development' ? 'source-map' : false,

    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/],

            },
            {
                test: /\.jsx$/,
                loader: "react-hot-loader!babel-loader",
                exclude: [/node_modules/, /public/],
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: "./public",
        port,
        proxy: {
            '/api/**': {
                target: 'http://localhost:3001',
                secure: false,
                changeOrigin: true,
            },
        },
        historyApiFallback: true
    },
}