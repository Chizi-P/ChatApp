import React from 'react';
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './app/screens/HomeScreen';
import ChatScreen from './app/screens/ChatScreen';
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import BackgroundTasks, { checkBackgroundAuthStatus } from './app/func/BackgroundTasks';
import InitConnectSocket from './app/func/InitConnectSocket';

const Stack = createStackNavigator()

export default function App() {
    




    /* 後台任務 */
    // const [backgroundTasksAuthorized, setBackgroundTasksAuthorized] = React.useState(true)
    // React.useEffect(() => {
    //     setBackgroundTasksAuthorized(checkBackgroundAuthStatus())
    //     BackgroundTasks()
    // }, [])

    // socket 連線
    const [ws, setWs] = React.useState(null)
    React.useEffect(() => {
        (async () => setWs(await InitConnectSocket()))()
        return () => ws && ws.close()
    }, [])

    // 加載字體
    const [fontsLoaded, fontsError] = useFonts({
        'Cascadia-Code': require('./app/assets/fonts/CascadiaCode-2111.01/ttf/CascadiaCode.ttf')
    })

    if (!fontsLoaded) return null
    

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
                <Stack.Screen name="Home" component={ HomeScreen }/>
                <Stack.Screen name="Chat" component={ ChatScreen } initialParams={{ws: ws}}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}