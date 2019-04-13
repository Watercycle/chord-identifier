module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { chrome: "70" } }],
    ["@babel/preset-typescript", {"isTSX": true, "allExtensions": true}]
  ],

  plugins: [
    ['babel-plugin-inferno'],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}