import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
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
        <SafeAreaView style={{ flex: 1 }}>
            <ListView title={user.name + " - CHAT LIST"}>
                <FlatList
                    data={groups}
                    renderItem={({ item: group, index }) => (
                        <ItemView
                            text={group.name}
                            onPress={() => {
                                console.log(group)
                                navigation.navigate('Chat', {
                                    group, 
                                    // groupID: group.id, name: group.name 
                                })
                            }}
                        />
                    )}
                    keyExtractor={(item, i) => i}
                />
            </ListView>
            <ListView title={'SETTING'}>
                <ItemView text={'To Setting Screen'} onPress={() => navigation.navigate('Setting')}/>
            </ListView>
        </SafeAreaView>
    )
}

export default HomeScreen
