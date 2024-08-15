import mongoose from "mongoose";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo/index";
import { ServerApp } from "./presentation/server";
import { MongoLogDatasource } from "./infrastructure/datasources/mongo.datasource";
import { LogEntity, LogSeverityLevel } from "./domain/entities/log.entity";



(async () => {

  main();

})();



async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  //CREAR UN REGISTRO O COLECCION
  //const newLog = await LogModel.create({
  //  message: "test from mongo",
  //  origin: "app.ts",
  //  level: "low"


  //})
  //await newLog.save();
  ///console.log(newLog)

 // const logs = await LogModel.find();
  //console.log(logs)

  ServerApp.start()
}

