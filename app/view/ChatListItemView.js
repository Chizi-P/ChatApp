import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MyAppText from './MyAppText'
import BoxView from './BoxView';
import LayoutView from './LayoutView';

function ChatListItemView({ friend, navigation }) {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', {friend})}>
            <View
                style={{
                    padding: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#111111',
                }}
            >
                <MyAppText
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: 'white'
                    }}
                >
                    { friend.name }
                </MyAppText>
            </View>
        </TouchableOpacity>
    )
}

export default ChatListItemView
