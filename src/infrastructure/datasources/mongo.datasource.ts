import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class MongoLogDatasource implements LogDatasource {
  async savelog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log)
    console.log("Created Log on MONGO: ",newLog.id)
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const getLog = await LogModel.find({level: severityLevel});
    return getLog.map( mongoModel =>  LogEntity.fromObject(mongoModel));    
  }
}
