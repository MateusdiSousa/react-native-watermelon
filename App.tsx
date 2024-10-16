import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Home from './src/pages/Home/home'
import CulturasList from './src/pages/ListCulturas/cultura_list'
import SyncComponent from './src/components/syncComponent';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SyncComponent />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{ title: 'Cadastro de Cultivo' }} />
        <Tab.Screen name="Culturas" component={CulturasList} options={{ title: 'Culturas Cadastradas' }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}