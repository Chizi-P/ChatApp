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
import TestScreen from './app/screens/TestScreen';
import PluginScreen from './app/screens/PluginScreen';
import PluginAppScreen from './app/screens/PluginAppScreen';
import SettingScreen from './app/screens/SettingScreen';
import LoginScreen from './app/screens/LoginScreen'
import InitScreen from './app/screens/InitScreen'

const Stack = createStackNavigator()

SplashScreen.preventAutoHideAsync()

export default function App() {

    // 通知設定
    const [expoPushToken, setExpoPushToken] = React.useState('');
    const [notification, setNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    React.useEffect(InitNotifications(setExpoPushToken, setNotification, notificationListener, responseListener), []);

    // React.useEffect(() => {
    //     const prepare = async () => {
    //         // 執行你的加載任務，例如：資料加載、字體加載等
        
    //         // 完成後隱藏啟始畫面
    //         await SplashScreen.hideAsync();
    //     }
    
    //     prepare();
    // }, []);
    
    
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

    /* 後台任務 */
    // const [backgroundTasksAuthorized, setBackgroundTasksAuthorized] = React.useState(true)
    // React.useEffect(() => {
    //     setBackgroundTasksAuthorized(checkBackgroundAuthStatus())
    //     BackgroundTasks()
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
                    initialRouteName='SignIn'
                >
                    {/* <Stack.Screen name="Test" component={ TestScreen } /> */}
                    <Stack.Screen name="Login" component={ LoginScreen } />
                    <Stack.Screen name="Init" component={ InitScreen } />
                    <Stack.Screen name="Home" component={ HomeScreen } />
                    <Stack.Screen name="Chat" component={ ChatScreen } />
                    <Stack.Screen name="Setting" component={ SettingScreen }/>
                    <Stack.Screen name="Plugin" component={ PluginScreen } />
                    <Stack.Screen name="PluginApp" component={ PluginAppScreen } />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    )
}