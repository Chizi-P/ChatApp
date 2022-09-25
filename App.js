import React from 'react';
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import HomeScreen from './app/screens/HomeScreen';
import ChatScreen from './app/screens/ChatScreen';
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator()

export default function App() {

    // socket 連線
    const [ws, setWs] = React.useState(null)
    React.useEffect(() => {
        ws
            ? initConnectSocket()
            : setWs(io('http://172.26.1.66:3000/', { query: { token: 'token' } }))
        return () => ws && ws.close()
    }, [ws])

    const initConnectSocket = () => {
        ws.on('connect', () => {
            console.log('client connect success')
            ws.on('msg', async (data, callback) => {
                console.log('msg:', msg)
                if (msg && msg.hasOrder) {
                    Alert({ title: '有新消息！', onOk: getClientRequest })
                    const oldItem = JSON.parse(await AsyncStorage.getItem(`@chatRecord.${data.id}`))
                    const newItem = oldItem.concat(data)
                    await AsyncStorage.setItem(`@chatRecord.${data.id}`, newItem)
                    callback('received')
                } else {
                    callback('error')
                }
            })
        })
        ws.on('error', error => {
            console.log(error)
        })
    }

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
                <Stack.Screen name="Home" component={ HomeScreen }/>
                <Stack.Screen name="Chat" component={ ChatScreen } initialParams={{ws: ws}}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}