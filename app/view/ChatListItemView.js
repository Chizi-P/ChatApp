import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MyAppText from './MyAppText'

function ChatListItemView({ item, navigation }) {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', {item})}>
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
                    { item.name }
                </MyAppText>
            </View>
        </TouchableOpacity>
    )
}

export default ChatListItemView
