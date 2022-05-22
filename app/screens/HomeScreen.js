import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatListItemView from '../view/ChatListItemView';

const textData = [
    {name: 'Amy'},
    {name: 'Tom'}
]

function HomeScreen({ navigation }) {

    const [friends, setFriends] = React.useState([])

    React.useEffect(() => {
        (async () => {
            try {
                // await AsyncStorage.getItem('@friends') ?? 
                await AsyncStorage.setItem('@friends', JSON.stringify(textData))
                setFriends(JSON.parse(await AsyncStorage.getItem('@friends')))
            } catch(err) {
                console.error(err)
            }
        })()
    }, [])

    return (
        <SafeAreaView>
            <FlatList
                data={friends}
                renderItem={({ item }) => <ChatListItemView item={item} navigation={navigation}/>}
                keyExtractor={(item, i) => i}
            />
        </SafeAreaView>
    );
}

export default HomeScreen;