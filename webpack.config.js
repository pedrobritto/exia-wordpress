/**
 * Imports
 */
const path = require("path");
// const webpack = require("webpack");

const PATH = {
    dist: path.resolve("dist", "assets", "js"),
    src: path.resolve("src"),
};

/**
 * Main config
 */
module.exports = {
    mode: "development",
    context: path.resolve("src", "js"),

    entry: {
        app: path.resolve("src", "js", "app.js"),
    },

    output: {
        path: path.resolve(PATH.dist),
        filename: "[name].bundle.js",
    },

    /**
     * Modules
     */
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    useBuiltIns: "usage",
                                    targets: "last 2 versions, > .25%, ie 11",
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },

    devtool: "source-map",
};
