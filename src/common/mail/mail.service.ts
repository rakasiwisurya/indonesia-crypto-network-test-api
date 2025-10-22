// import { Injectable } from "@nestjs/common";
// import * as nodemailer from "nodemailer";
// import SMTPTransport from "nodemailer/lib/smtp-transport";

// @Injectable()
// export class MailService {
//   private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//       },
//     });
//   }

//   async sendMail({
//     to,
//     subject,
//     text,
//     html,
//   }: {
//     to: string;
//     subject: string;
//     text?: string;
//     html?: string;
//   }) {
//     const info = await this.transporter.sendMail({
//       from: `"Indonesia Crypto Network Test" <${process.env.GMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.info("Message sent: %s", info.messageId);
//     return info;
//   }
// }

import { Injectable } from "@nestjs/common";
import { Resend } from "resend";

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
    try {
      const result = await this.resend.emails.send({
        from: `Indonesia Crypto Network Test <${process.env.RESEND_DOMAIN}>`,
        to,
        subject,
        html,
      });

      console.info(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
