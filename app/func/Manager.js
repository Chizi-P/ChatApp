import AsyncStorage from '@react-native-async-storage/async-storage'

class Manager {
    constructor() {
        this.baseURL = 'http://192.168.0.16:3000/api/v1'
        this.token
        AsyncStorage.getItem('@user.token', (err, token) => {
            this.token = token
        })
        this.defaultExpires = 1000 * 60
    }
    
    async get(url, param, body = {}) {
        const response = await fetch(new URL(url, this.baseURL), { 
            method  : 'GET', 
            headers : new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            })
        })
        const responseText = await response.text()
        
        return {
            status : response.status,
            data   : JSON.parse(responseText)
        }
    }

    async getData(repo, id = '') {
        const getResponse = await this.get(`/${repo}/` + id)
        // OPT
        console.log(`get ${repo}\t${id} ok:`, !!getResponse.data)
        if (!getResponse.data) throw new Error(`error ${repo} ${id}`)
        return getResponse
    }

    async login(email, password) {
        const response = await fetch(new URL('/login', this.baseURL), { 
            method  : 'POST', 
            headers : new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ email, password })
        })
        const responseText = await response.text()
        const user = JSON.parse(responseText)
        if (user.token === undefined) return false
        await AsyncStorage.setItem('@user.token', user.token)
        return true
    }
    
    async logout() {
        return await AsyncStorage.removeItem('@user.token')
    }
    async setExpires(key, expires = this.defaultExpires) {
        return await AsyncStorage.setItem(key + '.expires', (Date.now() + expires).toString())
    }

    async isExpired(key) {
        let expires = await AsyncStorage.getItem(key + '.expires')
        if (expires === null) return true
        return parseInt(expires) < Date.now()
    }

    async load(repo, id) {
        console.log('loading', repo, id)

        const key = `@${repo}${id ? `:${id}` : ''}`
        // 獲取本地數據
        let oldData = await AsyncStorage.getItem(key)
        // 數據不存在
        if (oldData === null) {
            const getResponse = await this.getData(repo, id)
            await this.setExpires(key)
            await AsyncStorage.setItem(key, JSON.stringify(getResponse.data)).catch(console.warn)
            return getResponse.data
        }
        // 數據存在
        oldData = JSON.parse(oldData)

        // 未過期
        if (!await this.isExpired(key)) return oldData

        // 過期了
        // 獲取新數據
        const getResponse = await this.getData(repo, id)
        const newData = getResponse.data
        // 獲取失敗 返回舊數據
        if (getResponse.status >= 300) return oldData
        await this.setExpires(key)

        // 內容有更新
        // if (oldData.lastUpdatedTime !== newData.lastUpdatedTime) {
            await AsyncStorage.setItem(key, JSON.stringify(newData)).catch(console.warn)
        // }
        return newData
    }
}

export default new Manager()