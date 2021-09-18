import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import Home from "./screens/Home";
import VideoRecorder from "./screens/VideoRecorder";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          headerTitle: "Home",
          headerTintColor: "#fff",
          headerStyle:{
            backgroundColor: "#ff6b6b"
          }
        }} />
        <Stack.Screen name="Video Recorder" component={VideoRecorder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HomePage:{
    textAlign: 'center',
  }
});

export default App;