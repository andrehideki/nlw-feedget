import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "baeccf2cb56833",
      pass: "2bb8682b8369f6"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail(data: SendMailData) {
        const {subject, body} = data;
        transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'André Watanabe <andre.hkiw.oth@gmail.com>',
            subject: subject,
            html: body
        });
    }
}