import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  mongoConnectionString:
    process.env.DB_URL || 'mongodb://localhost:27017/test',
}));
