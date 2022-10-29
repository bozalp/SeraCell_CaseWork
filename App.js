/**
 * Seracell Case Work
 * 
 * Batuhan OZALP
 * github.com/bozalp
 */

import React from 'react';
import { Text, View, } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Automation from './src/Pages/Controller/Automation';
import OpenClose from './src/Pages/Controller/OpenClose';

const Tab = createBottomTabNavigator();

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Automation') {
              iconName = "memory";
            } else if (route.name === 'OpenClose') {
              iconName = "developer-board";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#54B435',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Automation" component={Automation} options={{
          title: "Kontrolcü Otomasyonu",
        }} />
        <Tab.Screen name="OpenClose" component={OpenClose} options={{
          title: "Kontrolcüler"
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;
