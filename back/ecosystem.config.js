require('dotenv').config();
module.exports = {
  apps: [
    {
      name: "challenge-atom",
      script: "index.js",
      env: {
        NODE_ENV: "production",
        ENV_FILE: ".env"
      }
    }
  ]
}
