export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;

  origin: string;
  createAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;
  public origin: string;
  constructor(options: LogEntityOptions) {
    const { message, level, origin, createAt } = options;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createAt = new Date();
  }

  //AHORA SE EMPIEZAN A HACER LOS METODOS DE LA ENTIDADES

  static fromJson = (json: string): LogEntity => {
    const { message, level, origin, createAt } = JSON.parse(json);
    const log = new LogEntity({ message, level, origin,createAt });
    log.createAt = new Date(createAt);

    return log;
  };

  public static fromObject = (object: {[key: string]: any} ) => {
    const {message, level, createAt, origin} = object;
    const log = new LogEntity({message,level,createAt,origin})
    return log;
  }

}
