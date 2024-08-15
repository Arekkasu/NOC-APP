import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {

  constructor(
  ) {
  }

  private transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      const sendInfo = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachements,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Prueba de nodemailer NOC",
      htmlBody = `
              <h3 style="color: red">ENVIO DE LOGS<h3>
            <p>famoso lorem ipsum</p>
            <p>Ver logs adjuntos</p>

          `;

    const attachments: Attachment[] = [
      { filename: "log-low.lg", path: "./logs/log-low.lg" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachements: attachments });
  }
}
