import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { findAllCultura } from '../../services/watermelon';
import { styles } from './styles';
import { Model } from '@nozbe/watermelondb';
import { withObservables } from "@nozbe/watermelondb/react"
import CulturaModel from '../../models/Cultura';
import { PontoCultivo } from '../../@types/culturaDto';

const Culturas = ({ item }: any) => {
    const data: CulturaModel = item

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Nome: {data.nome_cultivo}</Text>
            <Text style={styles.itemText}>Temperatura Máx: {data.temperatura_max}°C</Text>
            <Text style={styles.itemText}>Temperatura Mín: {data.temperatura_min}°C</Text>
            <Text style={styles.itemText}>Pluviometria Máx: {data.pluviometria_max} mm</Text>
            <Text style={styles.itemText}>Pluviometria Mín: {data.pluviometria_min} mm</Text>
            <Text style={styles.itemText}>Latitude: {data.ponto_cultivo.latitude}</Text>
            <Text style={styles.itemText}>Longitude: {data.ponto_cultivo.longitude}</Text>
        </View>
        )
};

const enhance = withObservables(['culturas'], ({ culturas }) => ({
    culturas
}))

const enhanceCulturas = enhance(Culturas)

const CulturasList = () => {
    const [culturas, setCulturas] = useState<CulturaModel[]>([]);

    const fetchCulturas = async () => {
        try {
            const allCulturas = await findAllCultura()
            setCulturas(allCulturas);
        } catch (error) {
            console.error('Erro ao buscar as culturas:', error);
        }
    };

    useEffect(() => {
        fetchCulturas();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Culturas Cadastradas</Text>
            <FlatList
                data={culturas}
                keyExtractor={(item) => item.id}
                renderItem={Culturas}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma cultura cadastrada</Text>}
            />
        </View>
    );
};


export default CulturasList;