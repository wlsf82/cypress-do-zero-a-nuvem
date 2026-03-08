const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
})

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/',
  },
}) 