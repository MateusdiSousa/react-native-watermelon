import { createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    // {
    //   toVersion: 1,
    //   steps: [
    //     createTable({
    //       name: "culturas",
    //       columns: [
    //         { name: "_id", type: "string", isIndexed: true, isOptional: true },
    //         { name: "ponto_cultivo", type: "string" },
    //         { name: "nome_cultivo", type: "string" },
    //         { name: "temperatura_max", type: "number" },
    //         { name: "pluviometria_max", type: "number" },
    //         { name: "temperatura_min", type: "number" },
    //         { name: "pluviometria_min", type: "number" },
    //         { name: "temperaturas", type: "string", isOptional: true },
    //         { name: "pluviometrias", type: "string", isOptional: true },
    //         { name: "alertasTemp", type: "string", isOptional:true },
    //         { name: "alertasPluvi", type: "string", isOptional: true },
    //         { name: "lastUpdate", type: "number", isOptional: true }
    //       ]
    //     })
    //   ]
    // }
  ],
})

