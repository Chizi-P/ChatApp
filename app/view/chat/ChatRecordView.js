import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ARecordView from './ARecordView'

function ChatRecordView({record, style}) {

    const flatListRef = React.useRef(null)

    return (
        <View style={{...style}}>
            <FlatList
                ref                 = {flatListRef}
                data                = {record}
                renderItem          = {({ item }) => <ARecordView record={ item }/> }
                keyExtractor        = {(item, i) => i}
                onContentSizeChange = {() => {
                    flatListRef.current.scrollToEnd()
                }}
                scrollEnabled
            />
        </View>
    )
    
}

export default ChatRecordView;