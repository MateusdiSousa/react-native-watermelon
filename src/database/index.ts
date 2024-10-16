import  SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import { mySchema } from "../models/schema"
import migration from "../models/migration"
import { Database } from "@nozbe/watermelondb"
import CulturaModel from "../models/Cultura"


const adapter = new SQLiteAdapter({
  schema: mySchema,
  migrations: migration,
  dbName: "climamonitor",
  onSetUpError: error => {}
})

export const database = new Database({adapter : adapter, modelClasses: [CulturaModel]})