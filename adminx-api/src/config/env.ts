import "dotenv/config";

const env = {
  port: process.env.PORT || 3000,
  JWT_SECRET: "segradoum",
  DB_URI: "mongodb://127.0.0.1:27017/adminx",
};

export default env;
