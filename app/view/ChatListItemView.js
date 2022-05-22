import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

function ChatListItemView({ item, navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111111'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>{ item.name }</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ChatListItemView;