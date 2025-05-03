module.exports = {
  apps: [
    {
      name: "chat-io-server",
      script: "node_modules/.bin/tsx",
      args: "--env-file=.env src/index.ts",
      watch: ["src"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
