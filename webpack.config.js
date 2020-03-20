module.exports = {
  module: {
    rules: [

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        options: {
          shadowMode: true // vue-loader v15.0.9+
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
            options: {
              shadowMode: true
            }
          },
          'css-loader',
          // don't use `style-loader`
        ],
      },
    ]
]
}