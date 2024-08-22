import mongoose from "mongoose";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo/index";
import { ServerApp } from "./presentation/server";
import { MongoLogDatasource } from "./infrastructure/datasources/mongo.datasource";
import { LogEntity, LogSeverityLevel } from "./domain/entities/log.entity";
import { PrismaClient } from "@prisma/client";


(async () => {

  main();

})();



async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  //CREAR UN REGISTRO O COLECCION

 // const logs = await LogModel.find();
  //console.log(logs)

  ServerApp.start()

  //const prisma = new PrismaClient();
  /*const newLog = await prisma.logModel.create({
    data: {
  level: 'HIGH',
  origin: 'app.ts',
  message: 'test from prisma'
    }
  })

  console.log({newLog})
  */

  /*const logs = await prisma.logModel.findMany({
    where: {
      level: 'HIGH'
    }
  });

  console.log({logs})
  */
}

