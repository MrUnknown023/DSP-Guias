import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>  
      <Drawer.Navigator initialRouteName="Home">   
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
         <Drawer.Screen name="Alex" component={DetailsScreen} />              
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
