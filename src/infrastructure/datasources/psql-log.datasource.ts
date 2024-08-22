import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


// HACER LA ENUMERACION


const severityEnum = {

  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}


const prisma = new PrismaClient();

export class PostgresLogDataSource implements LogDatasource {
  async savelog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level]
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: level,
      }
    })

    console.log("POstgresql SAVE")
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const dbLogs = await prisma.logModel.findMany({
      where: {
        level: level
      }
    })

    return dbLogs.map(LogEntity.fromObject)


  }



} 
