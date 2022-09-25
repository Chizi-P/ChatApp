import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatListItemView from '../view/ChatListItemView';
import MyAppText from '../view/MyAppText';

const textData = [
    {name: 'Amy'},
    {name: 'Tom'}
]

function HomeScreen({ navigation }) {

    const [friends, setFriends] = React.useState([])

    React.useEffect(() => {
        (async () => {
            try {
                await AsyncStorage.setItem('@friends', JSON.stringify(textData))
                setFriends(JSON.parse(await AsyncStorage.getItem('@friends')))
            } catch(err) {
                console.error(err)
            }
        })()
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            {/* <MyAppText style={{fontSize: 20, fontWeight: 'bold'}}>設定</MyAppText> */}
            <FlatList
                data         = {friends}
                renderItem   = {({ item }) => <ChatListItemView friend={item} navigation={navigation}/>}
                keyExtractor = {(item, i) => i}
            />
        </SafeAreaView>
    );
}

export default HomeScreen;