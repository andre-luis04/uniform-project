import dotenv from "dotenv";
dotenv.config();

export const db_password = process.env.DB_PASSWORD;
export const db_host = process.env.DB_HOST;
export const db_user = process.env.DB_USER;
export const db_database = process.env.DB_DATABASE;
export const jwtConstant = {
  secret: process.env.JWT_SECRET,
};
