import React from 'react';
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import HomeScreen from './app/screens/HomeScreen';
import ChatScreen from './app/screens/ChatScreen';

const Stack = createStackNavigator()

export default function App() {

    // 加載字體
    const [loaded] = useFonts({
        'Cascadia-Code': require('./app/assets/fonts/CascadiaCode-2111.01/ttf/CascadiaCode.ttf')
    })

    if (!loaded) return null

    return (
        <NavigationContainer
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: 'black'
                },
                dark: true
            }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={ HomeScreen } />
                <Stack.Screen name="Chat" component={ ChatScreen } />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}