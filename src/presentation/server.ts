import { CheckService } from "../domain/use-cases/checks/check-services";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)


export class ServerApp {


  //NO REQUIERE INSTANCIAR LA CLASE
  public static start() {
    console.log('Server Running...')

    CronService.createJob('*/5 * * * * *', () => {
      const date = new Date();
      console.log('EJECUTADO CADA 5', date)
      new CheckService(fileSystemLogRepository, () => console.log("Success"),
        (error) => console.log(error)).execute("https://google.com")
    });

  }

}
