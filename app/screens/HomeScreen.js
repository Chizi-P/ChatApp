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

function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ListView title="CHAT LIST">
                <FlatList
                    data={useAppContext().friends}
                    renderItem={({ item: friend }) => (
                        <ItemView
                            onPress={() =>
                                navigation.navigate(friend.type, { friend })
                            }
                        >
                            {friend.name.toUpperCase()}
                        </ItemView>
                    )}
                    keyExtractor={(item, i) => i}
                />
            </ListView>
            {/* <FlatList
                data         = {useAppContext().friends}
                renderItem   = {({ item: friend }) => <ChatListItemView friend={friend} navigation={navigation}/>}
                keyExtractor = {(item, i) => i}
                style = {{margin: 20}}
            /> */}
        </SafeAreaView>
    )
}

export default HomeScreen
