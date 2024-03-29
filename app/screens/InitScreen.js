import React, { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import {
    View,
    Text,
    FlatList,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import MySafeAreaView from '../view/MySafeAreaView'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InitConnectSocket from '../func/InitConnectSocket'

import { useAppContext } from '../../AppContext'
import MyAppText from '../view/MyAppText'

function InitScreen() {

    SplashScreen.hideAsync()

    const { manager, setSocket, setCurrentChannel, setUpdateGroup, setUser } = useAppContext()
    const navigation = useNavigation()
    const [loadedSocket      , setLoadedSocket     ] = useState(false)
    const [loadedUserData    , setLoadedUserData   ] = useState(false)
    const [loadedFriendsData , setLoadedFriendsData] = useState(false)
    const [loadedGroupsData  , setLoadedGroupsData ] = useState(false) 
    const allLoaded = [loadedSocket, loadedUserData, loadedFriendsData, loadedGroupsData]

    // socket 連線
    useEffect(() => {
        (async () => setSocket(await InitConnectSocket(manager, setUpdateGroup, setCurrentChannel)))().then(() => {
            setLoadedSocket(true)
        })
    }, [])

    useEffect(() => {
        manager.load('user').then(user => {
            setUser(user)
            setLoadedUserData(true)
            
            Promise.all(user.friends.map(async id => await manager.load('user', id)))
                .then(setLoadedFriendsData(true))
                .catch(console.warn)
                
            Promise.all([...user.groups, ...user.directGroups].map(async id => await manager.load('group', id)))
                .then(setLoadedGroupsData(true))
                .catch(console.warn)
        }).catch(console.warn)
    }, [])

    
    
    useEffect(() => {
        if (allLoaded.every(loaded => loaded === true)) {
            navigation.reset({routes: [{ name: 'Home' }]})
        }
    }, allLoaded)

    const loadingProgress = allLoaded.reduce((a, b) => a + (b ? 1 / allLoaded.length : 0), 0) * 100

    return (
        <MySafeAreaView>
            <MyAppText>{loadingProgress}</MyAppText>
        </MySafeAreaView>
    )
}

export default InitScreen
