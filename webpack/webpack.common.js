const path = require('path');

module.exports = {
    entry: {
        content_script: path.join(__dirname, '../src/content_script.ts')
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: '../css/',
                        name: '[name].[ext]'
                    } }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};
