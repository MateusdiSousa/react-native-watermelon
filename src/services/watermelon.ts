import { synchronize } from '@nozbe/watermelondb/sync'
import { Collection, Model } from "@nozbe/watermelondb";
import { Cultivo } from "../@types/culturaDto";
import { database } from "../database"
import CulturaModel from "../models/Cultura";
import { BASE_URL } from './variables';
export const getCulturas = async (): Promise<Collection<CulturaModel>> => {
    return await database.get("culturas")
}

export const findOneCultura = async (id: string): Promise<CulturaModel> => {
    return (await getCulturas()).find(id);
}

export const findAllCultura = async (): Promise<CulturaModel[]> => {
    const cultura = await getCulturas()
    const allCulturas = await cultura.query().fetch()
    return allCulturas
}

export const createNewCultura = async (culturaDto: Cultivo) => {
    try {
        await database.write(async () => {
            const culturaCollection = database.get<CulturaModel>('culturas');

            await culturaCollection.create(cultura => {
                cultura._id = culturaDto._id || undefined;
                cultura.ponto_cultivo = culturaDto.ponto_cultivo;  // Converte o objeto para string
                cultura.nome_cultivo = culturaDto.nome_cultivo;
                cultura.temperatura_max = culturaDto.temperatura_max;
                cultura.pluviometria_max = culturaDto.pluviometria_max;
                cultura.temperatura_min = culturaDto.temperatura_min;
                cultura.pluviometria_min = culturaDto.pluviometria_min;
                cultura.temperaturas = culturaDto.temperaturas;  // Converte o objeto para string
                cultura.pluviometrias = culturaDto.pluviometrias;  // Converte o objeto para string
                cultura.alertasTemp = culturaDto.alertasTemp;  // Converte o objeto para string
                cultura.alertasPluvi = culturaDto.alertasPluvi;  // Converte o objeto para string
                cultura.lastUpdate = new Date().toISOString();  // Define a data de atualização como timestamp atual
            });

            console.log('Cultura criada com sucesso');
        });
    } catch (error) {
        console.error('Erro ao criar cultura:', error);
    }
}

export const updateCultura = async (culturaDto: Cultivo, id: string) => {
    const cultivo = await findOneCultura(id)

    await database.write(async () => {
        await cultivo.update(updateCultura => {
            updateCultura.ponto_cultivo = culturaDto.ponto_cultivo,
                updateCultura.nome_cultivo = culturaDto.nome_cultivo,
                updateCultura.temperatura_max = culturaDto.temperatura_max,
                updateCultura.temperatura_min = culturaDto.temperatura_min,
                updateCultura.pluviometria_max = culturaDto.pluviometria_max,
                updateCultura.pluviometria_min = culturaDto.pluviometria_min,
                updateCultura.pluviometrias = culturaDto.pluviometrias,
                updateCultura.lastUpdate = new Date().toISOString(),
                updateCultura.alertasPluvi = culturaDto.alertasPluvi,
                updateCultura.alertasTemp = culturaDto.alertasTemp
        })
    })
}

export const deleteCultura = async (id: string) => {
    const cultura = await findOneCultura(id)
    await database.write(async () => {
        await cultura.markAsDeleted();
        await cultura.destroyPermanently();
    })
}

export async function deleteAllData() {
    const culturas = await findAllCultura()
    await database.write(async () => {
        culturas.map(async cultura => {
            await cultura.markAsDeleted();
            await cultura.destroyPermanently();
        })
    })
}


export async function mySync() {
    await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
            const urlParams = `lastPulledSt=${lastPulledAt}`
            const response = await fetch(`${BASE_URL}/sync?${urlParams}`)
            if (!response.ok) {
                throw new Error(await response.text())
            }

            const { changes, timestamp } = await response.json()
            return { changes, timestamp }47]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
            const response = await fetch(`${BASE_URL}/sync`, {
                method: 'POST',
                body: JSON.stringify(changes),
            })
            if (!response.ok) {
                throw new Error(await response.text())
            }
        },
        migrationsEnabledAtVersion: 1,
    })
}