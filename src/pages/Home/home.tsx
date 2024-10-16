import { View, Text, Button, ScrollView, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Cultivo, PontoCultivo } from '../../@types/culturaDto';
import { createNewCultura } from '../../services/watermelon';
import { styles } from './styles';

export default function Home() {
  const [cultivo, setCultivo] = useState<Cultivo>({
    ponto_cultivo: { latitude: '', longitude: '' },
    nome_cultivo: '',
    temperatura_max: 0,
    pluviometria_max: 0,
    temperatura_min: 0,
    pluviometria_min: 0,
    alertasPluvi: [],
    alertasTemp: [],
    lastUpdate: "0",
    pluviometrias: [],
    temperaturas: [],  
  });

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (field: keyof Cultivo, value: any) => {
    setCultivo(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Função para lidar com mudanças nos campos de PontoCultivo
  const handlePontoChange = (field: keyof PontoCultivo, value: string) => {
    setCultivo(prevState => ({
      ...prevState,
      ponto_cultivo: {
        ...prevState.ponto_cultivo,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await createNewCultura(cultivo);
      Alert.alert("Salvo com sucesso!")
    } catch (error) {
      console.error('Erro ao salvar o cultivo:', error);
    }
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro de Cultivo</Text>

        <Text>Nome do Cultivo</Text>
        <TextInput
          style={styles.input}
          value={cultivo.nome_cultivo}
          onChangeText={(value) => handleChange('nome_cultivo', value)}
        />

        <Text>Latitude</Text>
        <TextInput
          style={styles.input}
          value={cultivo.ponto_cultivo.latitude}
          onChangeText={(value) => handlePontoChange('latitude', value)}
        />

        <Text>Longitude</Text>
        <TextInput
          style={styles.input}
          value={cultivo.ponto_cultivo.longitude}
          onChangeText={(value) => handlePontoChange('longitude', value)}
        />

        <Text>Temperatura Máxima</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cultivo.temperatura_max.toString()}
          onChangeText={(value) => handleChange('temperatura_max', Number(value))}
        />

        <Text>Pluviometria Máxima</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cultivo.pluviometria_max.toString()}
          onChangeText={(value) => handleChange('pluviometria_max', Number(value))}
        />

        <Text>Temperatura Mínima</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cultivo.temperatura_min.toString()}
          onChangeText={(value) => handleChange('temperatura_min', Number(value))}
        />

        <Text>Pluviometria Mínima</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cultivo.pluviometria_min.toString()}
          onChangeText={(value) => handleChange('pluviometria_min', Number(value))}
        />

        <Button title="Salvar Cultivo" onPress={handleSubmit} />
      </ScrollView>
    </View>
  )
}

