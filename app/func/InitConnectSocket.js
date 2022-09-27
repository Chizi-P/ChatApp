import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default InitConnectSocket = async () => {

    const token = await AsyncStorage.getItem('@token')

    const ws = io('http://172.26.1.66:3000/chat', { query: { token: token } })

    ws.on('connect', () => {
        console.log('client connect success')
        ws.on('msg', async (data, callback) => {
            console.log('msg:', data)
            if (data.msg) {
                const oldItem = JSON.parse(await AsyncStorage.getItem(`@chatRecord.${data.id}`))
                const newItem = oldItem.concat(data)
                await AsyncStorage.setItem(`@chatRecord.${data.id}`, JSON.stringify(newItem))
                callback('received')
            } else {
                callback('error')
            }
        })
    })
    ws.on('error', error => {
        console.log(error)
    })
    return ws
}