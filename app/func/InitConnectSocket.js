import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UpdateReceivedChatRecords } from './UpdateChatRecords'
import { schedulePushNotification } from './InitNotifications'
import api from '../config/api'

export default InitConnectSocket = async (manager, setUpdateGroup, setCurrentChannel) => {

    const token = await AsyncStorage.getItem('@user.token')

    const socket = io(api.socketURL, { 
        extraHeaders: {
            token: token
        }
        // query: { 
        //     isRememberLoginStatus: true
        // } 
    })

    socket.on('connect', () => {
        console.log('client connect success')
        socket.on('message', async (message, callback) => {
            console.log('[received]')
            console.log('groupID:\t', message.to)
            console.log('from:\t', message.from)
            console.log('type:\t', message.type)
            console.log('content:\t', message.content)

            const group = JSON.parse(await AsyncStorage.getItem(`@group:${message.to}`))

            group.messages.splice(0, 0, message.id)
            await AsyncStorage.multiSet([
                [`@group:${message.to}`  , JSON.stringify(group)],
                [`@message:${message.id}`, JSON.stringify(message)]
            ]).catch(console.warn)
            setUpdateGroup(val => !val)

            // setCurrentChannel(val => {
            //     if (val !== message.to) schedulePushNotification(message.from, message.content)
            //     return val
            // })
        })
    })
    socket.on('error', error => {
        console.log(error)
    })
    return socket
}