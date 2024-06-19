import { registerAs } from '@nestjs/config';

export default registerAs('graph-ql-config', () => ({
  debug: process.env.DEBUG === 'true',
}));
