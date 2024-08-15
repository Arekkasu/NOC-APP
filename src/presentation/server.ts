import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-services";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.use-case";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-server";

const LogRepository = new LogRepositoryImpl(
  //new FileSystemDatasource(),
  new MongoLogDatasource()
);
const emailService = new EmailService();

export class ServerApp {
  //NO REQUIERE INSTANCIAR LA CLASE
  public static start() {
    //console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY)
    /*
    new SendEmailLogs(
       emailService, 
       LogRepository,
     ).execute(
       ['Arek3071@gmail.com','arekkasu@proton.me']
     )
    // emailService.sendEmailWithFileSystemLogs(
     //  ['Arek3071@gmail.com','arekkasu@proton.me']
     //);
  */
    const Logs = CronService.createJob('5 * * * * *', () => {
      const date = new Date();
      console.log('EJECUTADO CADA 5', date)
      new CheckService(LogRepository, () => console.log("Success"),
        (error) => console.log(error)).execute("https://google.com")
    })

   const Enviar_Emails = CronService.createJob('20 * * * * *', () => {

      new SendEmailLogs(emailService, LogRepository,).execute(
        ['Arek3071@gmail.com', 'arekkasu@proton.me'])
   })

  }
}

