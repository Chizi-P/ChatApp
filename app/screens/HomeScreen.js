import React from 'react';
import { View, Text, SafeAreaView, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatListItemView from '../view/ChatListItemView';
import MyAppText from '../view/MyAppText';
import { useAppContext } from '../../AppContext';

function HomeScreen({ navigation, route }) {

    return (
        <SafeAreaView style={{flex: 1}}>
            {/* <MyAppText style={{fontSize: 20, fontWeight: 'bold'}}>設定</MyAppText> */}
            <FlatList
                data         = {useAppContext().friends}
                renderItem   = {({ item: friend }) => <ChatListItemView friend={friend} navigation={navigation}/>}
                keyExtractor = {(item, i) => i}
                style = {{margin: 20}}
            />
        </SafeAreaView>
    );
}

export default HomeScreen;