import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

export async function schedulePushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            // subtitle: 'subtitle',
            body, 
            data: { data: 'goes here' },
        },
        trigger: null,
    })
}

async function registerForPushNotificationsAsync() {
    let token
  
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        })
    }
  
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!')
            return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
        console.log(token)
    } else {
        alert('Must use physical device for Push Notifications')
    }
  
    return token
}

export default (setExpoPushToken, setNotification, notificationListener, responseListener) => {
    return () => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token)).catch(console.warn)
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification)
        })
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response)
        })
    
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseListener.current)
        }
    }
}