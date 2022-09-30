import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UpdateReceivedChatRecords } from './UpdateChatRecords'

export default InitConnectSocket = async (chatRecords, setChatRecords) => {

    const token = await AsyncStorage.getItem('@token')

    const ws = io('http://172.26.1.66:3000/chat', { 
        auth: {
            token: '00000',
            // token: token,
            // account: '',
            // password: ''
        }, 
        // query: { 
        //     isRememberLoginStatus: true
        // } 
    })

    ws.on('connect', () => {
        console.log('client connect success')
        ws.on('msg', async (sender, data, callback) => {
            console.log('data:', data)
            const newChatRecords = await UpdateReceivedChatRecords(sender, data)
            callback({ state: 'received' })
            setChatRecords(newChatRecords)
        })
    })
    ws.on('error', error => {
        console.log(error)
    })
    return ws
}