//import { defineConfig } from 'prisma/config'
const { defineConfig } = require("prisma/config");

const dotenv = require("dotenv");
dotenv.config();

module.exports = defineConfig({
  migrations: {
    seed: "node src/prisma/seed.js",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
