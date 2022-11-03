import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChatListItemView from '../view/ChatListItemView'
import MyAppText from '../view/MyAppText'
import { useAppContext } from '../../AppContext'
import ListView from '../view/ListView'
import GridPointBackgroundView from '../view/GridPointBackgroundView'
import ItemView from '../view/ItemView'
import ChartView from '../view/chart/ChartView'
import { schedulePushNotification } from '../func/InitNotifications'

function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ListView title="CHAT LIST">
                <FlatList
                    data={useAppContext().friends}
                    renderItem={({ item: friend }) => (
                        <ItemView
                            text={friend.name.toUpperCase()}
                            onPress={() =>
                                navigation.navigate(friend.type, { friend })
                            }
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
