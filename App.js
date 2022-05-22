import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import colors from './app/config/colors'
import HomeScreen from './app/screens/HomeScreen';
import ChatScreen from './app/screens/ChatScreen';

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: 'black'
                },
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