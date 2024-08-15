import moongose from "mongoose";

interface ConecctionOptions {

  mongoUrl: string;
  dbName: string;
}


export class MongoDatabase {
  
  static async connect(options: ConecctionOptions){
   const {mongoUrl, dbName} = options
    
    try{
      await moongose.connect(mongoUrl, {dbName})
      console.log("connected to Mongo")
    }catch(error){
      console.log("Mongo Connection error")
      throw error
    }

  }

}
