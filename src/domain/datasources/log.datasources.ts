import { LogEntity, LogSeverityLevel } from "../entities/log.entity";




export abstract class LogDatasource{

  abstract savelog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>

}
