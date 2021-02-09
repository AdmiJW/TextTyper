
const path = require('path');

module.exports = {
    mode: 'production',
    entry: "./src/TextTyper.js",
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build'),
        library: "TextTyper",
        libraryTarget: 'umd',
        libraryExport: 'default',
        scriptType: 'module'
    },

    module: {
        rules: [ { test: /\.css$/, use: ['style-loader', 'css-loader'] } ]
    }
}