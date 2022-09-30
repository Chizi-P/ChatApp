import AsyncStorage from "@react-native-async-storage/async-storage"

export const isFirstLaunch = async () => {
    const alreadyLaunched = await AsyncStorage.getItem('@alreadyLaunched')
    if (alreadyLaunched === null) {
        AsyncStorage.setItem('@alreadyLaunched', 'true')
        return true
    }
    return false
}