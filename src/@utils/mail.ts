import { BadGatewayException } from '@nestjs/common';
import { createTransport, SendMailOptions } from 'nodemailer';
import { SMTP } from 'src/@config/constant';

const transporter = createTransport({
  host: SMTP.host,
  port: SMTP.port,
  secure: true,
  auth: {
    user: SMTP.user,
    pass: SMTP.password,
  },
});

const sendMail = async (options: SendMailOptions) => {
  try {
    options.from = {
      name: 'Manakamana Online',
      address: SMTP.user,
    };
    const result = await transporter.sendMail(options);
    console.log(result, 'Mail sent');
  } catch (err) {
    throw new BadGatewayException('Mail not sent');
  }
};

export { sendMail };
