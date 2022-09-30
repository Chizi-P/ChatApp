import React from 'react';
import 'react-native-gesture-handler'
import { AppProvider } from './AppContext';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './app/screens/HomeScreen';
import ChatScreen from './app/screens/ChatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import BackgroundTasks, { checkBackgroundAuthStatus } from './app/func/BackgroundTasks';
import { isFirstLaunch } from './app/func/firstLaunch';
import InitNotifications from './app/func/InitNotifications';

const Stack = createStackNavigator()

export default function App() {

    // 通知設定
    const [expoPushToken, setExpoPushToken] = React.useState('');
    const [notification, setNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    React.useEffect(InitNotifications(setExpoPushToken, setNotification, notificationListener, responseListener), []);
    
    // 首次打開
    const [firstLaunch, setFirstLaunch] = React.useState(null)
    React.useEffect(() => {
        // AsyncStorage.clear(() => console.log('clear!'))
        if (firstLaunch === null) {
            (async () => {
                setFirstLaunch(await isFirstLaunch())
            })()
        } else if (firstLaunch) {
            console.log('[first launch]')

        } else {
            console.log('[already launched]')
        }
    }, [firstLaunch])

    // 加載好友
    const PresetFriends = [{name: 'Tom', id: 'Tom'}, {name: 'Amy', id: 'Amy'}]
    const [friends, setFriends] = React.useState([])
    React.useEffect(() => {
        (async () => {
            const storagedFriends = await AsyncStorage.getItem('@friends')
            if (storagedFriends === null) {
                await AsyncStorage.setItem('@friends', JSON.stringify(PresetFriends))
            } else {
                setFriends(JSON.parse(storagedFriends))
            }
        })()
    }, [])

    /* 後台任務 */
    // const [backgroundTasksAuthorized, setBackgroundTasksAuthorized] = React.useState(true)
    // React.useEffect(() => {
    //     setBackgroundTasksAuthorized(checkBackgroundAuthStatus())
    //     BackgroundTasks()
    // }, [])

    // socket 連線
    // const [ws, setWs] = React.useState(null)
    // React.useEffect(() => {
    //     (async () => setWs(await InitConnectSocket(chatRecords, setChatRecords)))()
    //     return () => ws && ws.close()
    // }, [])

    // 加載字體
    const [fontsLoaded, fontsError] = useFonts({
        'Cascadia-Code': require('./app/assets/fonts/CascadiaCode-2111.01/ttf/CascadiaCode.ttf')
    })

    if (!fontsLoaded) return null

    return (
        <AppProvider>
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
                    {/* FIXME: schedulePushNotification */}
                    <Stack.Screen name="Home" component={ HomeScreen } initialParams={{friends: friends}}/>
                    <Stack.Screen name="Chat" component={ ChatScreen } />
                    
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    )
}