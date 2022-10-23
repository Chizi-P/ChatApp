import React from 'react'
import InitConnectSocket from './app/func/InitConnectSocket'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.chat')

export const AppContext = React.createContext({
    ws: null,
    db: db,
    // 好友
    friends: null,
    setFriends: friends => {},
    // 聊天記錄
    chatRecords: null,
    setChatRecords: chatRecords => {},
    // 當前打開的頁面
    currentChannel: null,
    setCurrentChannel: currentChannel => {}
})

export const AppProvider = ({children}) => {

    const [currentChannel, setCurrentChannel] = React.useState('')

    // 加載好友
    const PresetFriends = [
        {name: 'Tom', id: 'Tom', type: 'chat'}, 
        {name: 'Amy', id: 'Amy', type: 'chat'}, 
        {name: 'plugin', id: 'plugin', type: 'plugin'}
    ]
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

    // 加載聊天記錄
    const PresetChatRecords = {sent: {}, received: {}}
    const [chatRecords, setChatRecords] = React.useState(PresetChatRecords)
    React.useEffect(() => {
        (async () => {
            const storagedChatRecords = await AsyncStorage.getItem('@chatRecords')
            if (storagedChatRecords === null) {
                await AsyncStorage.setItem('@chatRecords', JSON.stringify(PresetChatRecords))
            } else {
                setChatRecords(JSON.parse(storagedChatRecords))
            }
        })()
    }, [])
    
    // socket 連線
    const [ws, setWs] = React.useState(null)
    React.useEffect(() => {
        (async () => setWs(await InitConnectSocket(chatRecords, setChatRecords)))()
        return () => ws && ws.close()
    }, [])

    return (
        <AppContext.Provider value={{
            ws, 
            friends,
            setFriends,
            chatRecords, 
            setChatRecords,
            currentChannel,
            setCurrentChannel,
            db
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => React.useContext(AppContext)