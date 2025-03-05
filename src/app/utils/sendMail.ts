import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: config.email as string,
      pass: config.pass as string,
    },
  });

  await transporter.sendMail({
    from: config.email as string,
    to,
    subject,
    text,
  });
};
