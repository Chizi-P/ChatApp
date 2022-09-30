import React from 'react'
import InitConnectSocket from './app/func/InitConnectSocket'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SQLite from 'expo-sqlite';

export const AppContext = React.createContext({
    ws: null,
    chatRecords: null,
    setChatRecords: chatRecords => {},
    db: null
})

export const AppProvider = ({children}) => {

    
    // const db = SQLite.openDatabase('db.chat')

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
        <AppContext.Provider value={{ws, chatRecords, setChatRecords}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => React.useContext(AppContext)