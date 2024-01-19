import AsyncStorage from '@react-native-async-storage/async-storage'

class Manager {
    constructor(socket = null) {
        this.baseURL = 'http://192.168.0.16:3000/api/v1/'
        this.token
        AsyncStorage.getItem('@user.token', (err, token) => {
            this.token = token
        })
        this.defaultExpires = 1000 * 60 * 5
        this.socket = socket
    }
    
    async get(url, param, body = {}) {
        const response = await fetch(new URL(url, this.baseURL).href, { 
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
        const getResponse = await this.get(`${repo}/` + id)
        // OPT
        console.log(`get ${repo}\t${id} ok:`, !!getResponse.data)
        if (!getResponse.data) throw new Error(`error ${repo} ${id}`)
        return getResponse
    }

    async login(email, password) {
        const response = await fetch(new URL('login', this.baseURL).href, { 
            method  : 'POST', 
            headers : new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ email, password })
        })
        const responseText = await response.text()
        console.log('responseText', responseText)
        console.log('response.status', response.status)
        console.log('response', response)
        if (!response.ok) return false

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
    async sendMessage(groupID, type, content) {
        this.socket.emit('message', groupID, type, content, async res => {
            if (!res.ok) {
                console.log('發送失敗！', res.msg)
                return Promise.reject('發送失敗！')
            }
            console.log(res.msg)
            return Promise.resolve('發送成功！')
        })
    }

    async uploadImage(image, progress) {

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = image
        let filename = localUri.split('/').pop()

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        let formData = new FormData()
        // Assume "photo" is the name of the form field the server expects
        formData.append('file', { uri: image, name: filename, type })

        const response = await fetch(new URL('file', this.baseURL).href, { 
            method  : 'POST', 
            headers : new Headers({
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${this.token}`
            }),
            body: formData,
        })
        const url = await response.text()
        
        return {
            status : response.status,
            url
        }
    }
    async getImageSourceBlurhash(url) {
        const response = await fetch(new URL(url + '?blurhash=true', this.baseURL).href, { 
            method  : 'GET', 
            headers : new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            })
        })
        const responseText = await response.text()
        return responseText
    }
    async loadBlurhash(url) {
        const savedBlurhash = await AsyncStorage.getItem(`@${url}`)
        if (savedBlurhash !== null) return savedBlurhash
        const blurhash = await this.getImageSourceBlurhash(url)
        AsyncStorage.setItem(`@${url}`, blurhash)
        return blurhash
    }
    
    getImageSource(url) {
        return {
            uri: this.baseURL + url,
            method: 'GET',
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        }
    }
}

export default Manager