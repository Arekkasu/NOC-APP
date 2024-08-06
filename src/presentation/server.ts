import { CheckService } from "../domain/use-cases/checks/check-services";
import { CronService } from "./cron/cron-service"



export class ServerApp {


  //NO REQUIERE INSTANCIAR LA CLASE
  public static start() {
    console.log('Server Running...')

    CronService.createJob('*/5 * * * * *', () => {
      const date = new Date();
      console.log('EJECUTADO CADA 5', date)
      new CheckService(() => console.log("Success"),
        (error) => console.log(error)).execute("https://google.com")
    });

  }

}
