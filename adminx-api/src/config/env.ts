import "dotenv/config";

const env = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "segradoum",
  DB_URI: process.env.DB_URI || "mongodb://127.0.0.1:27017/adminx",
};

export default env;
