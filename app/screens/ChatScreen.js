import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAppText from '../view/MyAppText';
import LayoutView from '../view/LayoutView';


function ChatScreen({ navigation, route }) {

    const { item } = route.params

    return (
        <SafeAreaView>
            <LayoutView spacing={30} margin={25}>
                <MyAppText style={{color: 'white'}}>{ item.name }</MyAppText>
                <MyAppText style={{color: 'white'}}></MyAppText>
            </LayoutView>
        </SafeAreaView>
    );
}

export default ChatScreen;