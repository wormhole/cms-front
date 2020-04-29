const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
module.exports = {
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    entry: path.join(__dirname, "../src/App.jsx"),
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 100
                }
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, "../src/index.html")
        })
    ]
};