import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../config/api'

async function getData(url, param, body = {}) {
    const baseURL  = api.baseURL
    const token    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwMUhKUjRRTVAzWlFQSDMxMlQ3QVZNM0I0WiIsIm5hbWUiOiJ1c2VyMiIsImVtYWlsIjoidXNlcjJAZW1haWwuY29tIiwiY3JlYXRlQXQiOjE3MDM5MzczMjYwMzcsImlhdCI6MTcwMzkzNzMyNn0.mUOxr9T0qleClXz4Uhojwgm5fLgpDTE_AgmuyOjAQNk'
    const response = await fetch(new URL(url, baseURL), { 
        method  : 'GET', 
        // FIXME - token
        // body    : this.method !== 'GET' ? JSON.stringify({ token: token, ...body }): null,
        headers : new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        })
    })
    const responseText = await response.text()
    return JSON.parse(responseText)
}

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 10,
    enableCache: true, 
    sync: {
        async user(params) {
            // key-id
            const { id, syncParams: { update } } = params
            const user = await getData('/user/' + id)
            // console.log(`user ${id} sync resp:`, user)
            if (!user) throw new Error(`error syncing user${id}`)

            // if (Array.isArray(id) && Array.isArray(user)) {
            //     for (const i in user) {
            //         await storage.save({
            //             key  : 'users',
            //             id   : id[i],
            //             data : user[i]
            //         }).catch(console.warn)
            //     }
            //     return
            // }
            await storage.save({
                key  : 'user',
                id,
                data : user
            }).catch(console.warn)
            update?.(user)
        },
        async group(params) {
            const { id, syncParams: { update } } = params

            console.log('ids --- ', id)

            const key = 'group'

            // id: string[], 使用 getBatchDataWithIds
            if (Array.isArray(id)) {
                let dataList = []
                for (const e of id) {
                    console.log('id:', e)
                    let data
                    try {
                        data = await getData(`/${key}/${e}`)
                    } catch(err) {
                        console.error(err)
                    }

                    // console.log(`${key} ${e} sync resp:`, data)
                    if (!data) throw new Error(`error syncing ${key}${e}`)
                    dataList.push(data)
                    await storage.save({
                        key  : key,
                        id   : e,
                        data : data
                    }).catch(console.warn)
                }
                update?.(dataList)
                return

            // id: string, 使用 load
            } else {
                const data = await getData(`/${key}/${id}`)
                // console.log(`${key} ${id} sync resp:`, data)
                if (!data) throw new Error(`error syncing ${key}${id}`)

                await storage.save({
                    key  : key,
                    id   : id,
                    data : data
                }).catch(console.warn)
                update?.(data)
            }
        },
        async message(params) {
            const { id } = params
            const message = await getData('/message/' + id)
            console.log(`message ${id} sync resp:`, message)
            if (!message) throw new Error(`error syncing message${id}`)
            // if (Array.isArray(id) && Array.isArray(message)) {
            //     for (const i in message) {
            //         await storage.save({
            //             key  : 'message',
            //             id   : id[i],
            //             data : message[i]
            //         }).catch(console.warn)
            //     }
            //     return
            // }
            await storage.save({
                key  : 'message',
                id,
                data : message
            }).catch(console.warn)
        },
        async task(params) {
            const { id } = params
            const task = await getData('/task/' + id)
            console.log(`task ${id} sync resp:`, task)
            if (!task) throw new Error(`error syncing task${id}`)
            await storage.save({
                key  : 'task',
                id,
                data : task
            }).catch(console.warn)
        }
    },
})

export default storage
  