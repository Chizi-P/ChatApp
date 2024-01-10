import AsyncStorage from '@react-native-async-storage/async-storage'

class Manager {
    constructor() {
        this.baseURL = 'http://192.168.0.16:3000/api/v1'
        this.token
        AsyncStorage.getItem('@user.token', (err, token) => {
            this.token = token
        })
    }
    
    async getData(url, param, body = {}) {
        const response = await fetch(new URL(url, this.baseURL), { 
            method  : 'GET', 
            headers : new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            })
        })
        const responseText = await response.text()
        return JSON.parse(responseText)
    }

    async get(repo, id = '') {
        const data = await this.getData(`/${repo}/` + id)
        console.log(`get ${repo}\t${id} ok:`, !!data)
        if (!data) throw new Error(`error ${repo} ${id}`)
        return data
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
        await AsyncStorage.setItem('@user.id', user.userID)
        return true
    }
    
    async logout() {
        await AsyncStorage.removeItem('@user.token')
    }

    async load(repo, id) {
        // FIXME - 附帶最後更新時間
        const data = await this.get(repo, id)
        if (true) { // FIXME - 需要更新
            await AsyncStorage.setItem(`@${repo}${id ? `:${id}` : ''}`, JSON.stringify(data)).catch(console.warn)
            return data
        } else { // 不需要更新，返回舊數據
            return JSON.parse(await AsyncStorage.getItem(`@${repo}`))
        }
    }
}

export default new Manager()