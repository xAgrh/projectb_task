import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { registerAs } from '@nestjs/config';
import * as path from 'path';

export default registerAs('nodemailer', () => ({
  // "MAIL_ENCRYPTION": "TLS/SSL"
  transport: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  defaults: {
    from: '"Projectb" <test.us.fast@gmail.com>',
    attachments: [],
  },
  template: {
    dir: path.resolve(__dirname, '../emails-handling/templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}));
