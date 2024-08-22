import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly succesCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  private callLogs(log: LogEntity) {
    
    this.logRepository.forEach((logRepository) => {
        logRepository.savelog(log)
    })

  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on Check Service ${url}`);
      }
      const log: LogEntity = new LogEntity({message: `Server ${url} working`, level: LogSeverityLevel.low, origin: "check-service-ts"})
      this.callLogs(log);
      this.succesCallback && this.succesCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`
      const log: LogEntity = new LogEntity({message: errorMessage, level: LogSeverityLevel.low, origin: "check-service-ts"})
      this.callLogs(log);

      //MINE: OPERADOR CORTOCIRCUITO CON &&
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
