export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.level = level;
    this.message = message;
    this.createAt = new Date();
  }


  //AHORA SE EMPIEZAN A HACER LOS METODOS DE LA ENTIDADES

  static fromJson = ( json: string ): LogEntity => {
      const {message, level, createdAt} = JSON.parse(json);
      const log = new LogEntity(message, level);
      log.createAt = new Date(createdAt);

      return log;


  }
}
