import React from 'react';
import { View, Text, SafeAreaView, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatListItemView from '../view/ChatListItemView';
import MyAppText from '../view/MyAppText';
import { schedulePushNotification } from '../func/InitNotifications';

function HomeScreen({ navigation, route }) {
    
    // FIXME: schedulePushNotification
    const { friends } = route.params

    return (
        <SafeAreaView style={{flex: 1}}>
            {/* <MyAppText style={{fontSize: 20, fontWeight: 'bold'}}>設定</MyAppText> */}
            <FlatList
                data         = {friends}
                renderItem   = {({ item: friend }) => <ChatListItemView friend={friend} navigation={navigation}/>}
                keyExtractor = {(item, i) => i}
            />
            <Button title='test' onPress={async () => {
                await schedulePushNotification()
            }}/>
        </SafeAreaView>
    );
}

export default HomeScreen;