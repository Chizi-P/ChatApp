import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import MySafeAreaView from '../view/MySafeAreaView'
import { useNavigation, CommonActions  } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChatListItemView from '../view/ChatListItemView'
import MyAppText from '../view/MyAppText'
import { useAppContext } from '../../AppContext'
import ListView from '../view/ListView'
import GridPointBackgroundView from '../view/GridPointBackgroundView'
import ItemView from '../view/ItemView'
import ChartView from '../view/chart/ChartView'
import { schedulePushNotification } from '../func/InitNotifications'


function HomeScreen() {

    // FIXME - groups
    const { manager, user, updateGroup } = useAppContext()
    const navigation = useNavigation()

    const [groups, setGroups] = useState([])

    useEffect(() => {
        Promise.all([...user.groups, ...user.directGroups].map(async groupID => 
            await manager.load('group', groupID)
        ))
        .then(setGroups)
        .catch(console.warn)
    }, [])

    return (
        <MySafeAreaView>
            <ListView title={user.name + " - CHAT LIST"}>
                <FlatList
                    data         = { groups }
                    keyExtractor = { group => group.id }
                    renderItem   = {({ item: group }) => (
                        <ItemView
                            text={group.name}
                            onPress={() => {
                                console.log(group)
                                navigation.navigate('Chat', { group })
                            }}
                        />
                    )}
                    
                />
            </ListView>
            <ListView title={'SETTING'}>
                <ItemView text={'To Setting Screen'} onPress={() => navigation.navigate('Setting')}/>
            </ListView>
            {/* <ListView title={'Test'}>
                <ItemView text={'Test Screen'} onPress={() => navigation.navigate('Test')}/>
            </ListView> */}

        </MySafeAreaView>
    )
}

export default HomeScreen
