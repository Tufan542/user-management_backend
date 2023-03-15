const { cleanEnv, port, str } = require("envalid");

const validateEnv = () =>
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production"],
    }),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port({
      default: 5432,
    }),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    PORT: port({
      default: 8000,
    }),
  });

module.exports = validateEnv;