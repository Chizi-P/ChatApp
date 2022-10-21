import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MyAppText from './MyAppText'
import BoxView from './BoxView';
import LayoutView from './LayoutView';
import colors from '../config/colors';

function ChatListItemView({ friend, navigation }) {

    return (
        <TouchableOpacity onPress={() => {
            if (friend.type === 'chat') {
                return navigation.navigate('Chat', {friend})
            }
            if (friend.type === '+') {
                console.log('打開內嵌應用')
                // return navigation.navigate('app', {})
            }
        }} 
            style={{
                marginBottom: 20
            }}
        >
            <View
                style={{
                    padding         : 20,
                    flexDirection   : 'row',
                    justifyContent  : 'space-between',
                    alignItems      : 'center',
                    // backgroundColor : '#111111',

                    borderRadius    : 20,
                    borderWidth     : 1,
                    borderColor     : colors.primary
                }}
            >
                <MyAppText
                    style={{
                        fontWeight : 'bold',
                        fontSize   : 18,
                        color      : 'white'
                    }}
                >
                    { friend.name }
                </MyAppText>
            </View>
        </TouchableOpacity>
    )
}

export default ChatListItemView
