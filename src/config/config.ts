import { config as conf } from "dotenv"
conf()

const _config = {
  port: process.env.PORT,
  dbUri: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET
}

export const config = Object.freeze(_config)