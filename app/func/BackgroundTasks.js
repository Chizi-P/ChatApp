import BackgroundFetch from 'react-native-background-fetch'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateChatRecords from './UpdateChatRecords';

export default BackgroundTasks = () => {
    BackgroundFetch.configure({
        minimumFetchInterval: 15
    }, async (taskId) => {
        console.log("Received background-fetch event: " + taskId)

        // await defaultTasks()
        
        // await otherTasks()
        
        BackgroundFetch.finish(taskId)
    }, error => {
        console.log("RNBackgroundFetch failed to start")
    })
}

const defaultTasks = async () => {
    // 查看有沒有新消息
    
    const data = {}
    await UpdateChatRecords(data)
    // TODO:
}

const otherTasks = async () =>  {
    const tasks = JSON.parse(await AsyncStorage.getItem('@tasks'))
    // 
    return
}


// 檢查後台任務授權狀態
export const backgroundFetchStatus = () => {
    new Promise((resolve) => {
        BackgroundFetch.status((status) => {
            resolve(status)
        })
    })
}
// true  -> Authorized
// false -> Restricted
export const checkBackgroundAuthStatus = async () => {
    return backgroundFetchStatus() === 2
}